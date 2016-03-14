import {Page, Storage, LocalStorage, NavController} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';
import {FORM_DIRECTIVES} from 'angular2/common';
import {JwtHelper, AuthHttp} from 'angular2-jwt';
import {AuthService} from '../../services/auth/auth';
import {Observable} from 'rxjs/Rx';
import {TabsPage} from '../../pages/tabs/tabs';

declare var Auth0Lock: any;

@Page({
    templateUrl: 'build/pages/login/login.html',
    directives: [FORM_DIRECTIVES]
})
export class LoginPage {
    lock: any = new Auth0Lock('fAbi8WXpul27xGsU9DCnfDgs2w8E2SM5', 'umapp.eu.auth0.com');
    local: Storage = new Storage(LocalStorage);
    user: Object;

    constructor(private auth: AuthService, private nav: NavController) {
        let profile = this.local.get('profile')._result;
        if (profile) {
            this.user = JSON.parse(profile);
        }
    }

    login() {
        this.lock.show((err, profile, token) => {
            if (err) {
                alert(err);
                return;
            }
            this.local.set('profile', JSON.stringify(profile));
            this.local.set('id_token', token);
            this.user = profile;
            this.nav.setRoot(TabsPage);
        });
    }
}