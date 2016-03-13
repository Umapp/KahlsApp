import {App, Platform} from 'ionic-angular';
import {HTTP_PROVIDERS}    from 'angular2/http';
import {Http} from 'angular2/http';
import {provide} from 'angular2/core';
import {TabsPage} from './pages/tabs/tabs';
import {RoutineService} from './pages/routines/routine.service';
import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {AuthService} from './services/auth/auth';



// https://angular.io/docs/ts/latest/api/core/Type-interface.html
import {Type} from 'angular2/core';


@App({
    template: '<ion-nav [root]="rootPage"></ion-nav>',
    config: {}, // http://ionicframework.com/docs/v2/api/config/Config/
    providers: [HTTP_PROVIDERS, RoutineService, provide(AuthHttp, {
        useFactory: (http) => {
            return new AuthHttp(new AuthConfig(), http);
        },
        deps: [Http]
    }),
        AuthService]
})
export class MyApp {
    rootPage: Type = TabsPage;

    constructor(platform: Platform, private authHttp: AuthHttp, private auth: AuthService) {
        platform.ready().then(() => {
            
            this.auth.startupTokenRefresh();
        });
    }
}
