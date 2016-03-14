import {Page, Storage, LocalStorage, NavController, MenuController} from 'ionic-angular';
import {Http, Headers} from 'angular2/http';
import {FORM_DIRECTIVES} from 'angular2/common';
import {JwtHelper, AuthHttp} from 'angular2-jwt';
import {AuthService} from '../../services/auth/auth';
import {Observable} from 'rxjs/Rx';
import {LoginPage} from '../../pages/login/login';


@Page({
    templateUrl: 'build/pages/profile/profile.html',
    directives: [FORM_DIRECTIVES]
})
export class ProfilePage {
    local: Storage = new Storage(LocalStorage);
    user: Object;

    constructor(private auth: AuthService, private nav: NavController, private menu: MenuController) {
        let profile = this.local.get('profile')._result;
        if (profile) {
            this.user = JSON.parse(profile);
        }
    }

    logout() {
        this.local.remove('profile');
        this.local.remove('id_token');
        this.user = null;
        this.nav.setRoot(LoginPage);
    }
}