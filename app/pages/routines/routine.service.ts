import {Injectable} from 'angular2/core';
import {Http, Response, Headers} from 'angular2/http';
import {Observable} from 'rxjs/rx';
import {Routine} from './routine';

@Injectable()
export class RoutineService {
    headers: Headers;

    constructor(private http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    //private _heroesUrl = 'https://kahls.herokuapp.com/api/task/today/';

    private _heroesUrl = 'http://10.1.25.95:1335/api/task/today/';

    getRoutines() {
        return this.http.get(this._heroesUrl)
            .map((res: Response) => <Routine[]>res.json())
            .catch(this.handleError);
    }

    updateRoutine(routine: Routine, user: string) {
        console.log(this._heroesUrl + routine._id);
        return this.http.put(this._heroesUrl + routine._id, JSON.stringify({ user: user }), { headers: this.headers })
            .map((res: Response) => res.json());
    }

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}