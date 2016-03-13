import {Page, Alert, NavController, Modal, NavParams, ViewController} from 'ionic-angular';
import {Routine} from './routine';
import {OnInit} from 'angular2/core';
import {RoutineService} from './routine.service';
import {Observable} from 'rxjs/rx';
import {Filter} from './filter';


@Page({
    templateUrl: 'build/pages/routines/routines.html',
    pipes: [Filter],
})
export class Routines implements OnInit {
    //routines: Routine[];
    //routines: Observable<Routine[]>;
    routines: Routine[];
    weekday: string;
    routineTab: string = 'morning';

    errorMessage: string;
    constructor(private _routineService: RoutineService, private _nav: NavController) {
    }

    getRoutines() {
        this._routineService.getRoutines().subscribe(data => { console.log(data); this.routines = data });
    }

    doConfirm(routine: Routine) {
        let confirm = Alert.create({
            title: 'Är du säker?',
            message: 'Du kommer att låsa rutinen',
            buttons: [
                {
                    text: 'Nej',
                    handler: () => {
                        console.log('No clicked');
                    }
                },
                {
                    text: 'Ja',
                    handler: () => {
                        this._routineService.updateRoutine(routine, 'TANJA').subscribe(data => {
                            this.getRoutines();
                        }
                        );
                    }
                }
            ]
        });
        this._nav.present(confirm);

    }

    ngOnInit() {
        //this.getTask();
        this.getRoutines();
    }
}
