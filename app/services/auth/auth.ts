import {Storage, LocalStorage, NavController} from 'ionic-angular';
import {AuthHttp, JwtHelper, tokenNotExpired} from 'angular2-jwt';
import {Injectable} from 'angular2/core';
import {Observable} from 'rxjs/Rx';
import {TabsPage} from '../../pages/tabs/tabs';

// Avoid name not found warnings
declare var Auth0Lock: any;

@Injectable()
export class AuthService {
    jwtHelper: JwtHelper = new JwtHelper();
    lock: any = new Auth0Lock('fAbi8WXpul27xGsU9DCnfDgs2w8E2SM5', 'umapp.eu.auth0.com');
    local: Storage = new Storage(LocalStorage);
    refreshSubscription: any;
    user: Object;

    constructor(private authHttp: AuthHttp) {
        let profile = this.local.get('profile')._result;
        if (profile) {
            this.user = JSON.parse(profile);
        }
    }

    public authenticated() {
        // Check if there's an unexpired JWT
        return tokenNotExpired();
    }

    public logout() {
        this.local.remove('profile');
        this.local.remove('id_token');
        this.local.remove('refresh_token');
        this.user = null;
        // Unschedule the token refresh
        this.unscheduleRefresh();
    }

    public scheduleRefresh() {
        // If the user is authenticated, use the token stream
        // provided by angular2-jwt and flatMap the token
        let source = this.authHttp.tokenStream.flatMap(
            token => {
                // The delay to generate in this case is the difference
                // between the expiry time and the issued at time
                let jwtIat = this.jwtHelper.decodeToken(token).iat;
                let jwtExp = this.jwtHelper.decodeToken(token).exp;
                let iat = new Date(0);
                let exp = new Date(0);

                let delay = (exp.setUTCSeconds(jwtExp) - iat.setUTCSeconds(jwtIat));

                return Observable.interval(delay);
            });

        this.refreshSubscription = source.subscribe(() => {
            this.getNewJwt();
        });
    }

    public startupTokenRefresh() {
        // If the user is authenticated, use the token stream
        // provided by angular2-jwt and flatMap the token
        if (this.authenticated()) {
            let source = this.authHttp.tokenStream.flatMap(
                token => {
                    // Get the expiry time to generate
                    // a delay in milliseconds
                    let now: number = new Date().valueOf();
                    let jwtExp: number = this.jwtHelper.decodeToken(token).exp;
                    let exp: Date = new Date(0);
                    exp.setUTCSeconds(jwtExp);
                    let delay: number = exp.valueOf() - now;

                    // Use the delay in a timer to
                    // run the refresh at the proper time
                    return Observable.timer(delay);
                });

            // Once the delay time from above is
            // reached, get a new JWT and schedule
            // additional refreshes
            source.subscribe(() => {
                this.getNewJwt();
                this.scheduleRefresh();
            });
        }
    }

    public unscheduleRefresh() {
        // Unsubscribe fromt the refresh
        if (this.refreshSubscription) {
            this.refreshSubscription.unsubscribe();
        }
    }

    public getNewJwt() {
        // Get a new JWT from Auth0 using the refresh token saved
        // in local storage
        let refreshToken = this.local.get('refresh_token')._result;
        this.lock.getClient().refreshToken(refreshToken, (err, delegationRequest) => {
            if (err) {
                alert(err);
            }
            this.local.set('id_token', delegationRequest.id_token);
        });
    }
}