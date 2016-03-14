import {Page} from 'ionic-angular';
import {Routines} from '../routines/routines';
import {Page2} from '../page2/page2';
import {Page3} from '../page3/page3';
import {ProfilePage} from '../profile/profile';
import {AuthService} from '../../services/auth/auth';


@Page({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
    tab1Root: any = Routines;
    tab2Root: any = Page2;
    tab3Root: any = Page3;
    tab4Root: any = ProfilePage;

    constructor() { }
}
