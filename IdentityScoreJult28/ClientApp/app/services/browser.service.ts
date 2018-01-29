import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { RootObject } from '../interfaces/browserRoot.interface';
import { Observable } from "rxjs/Rx";
//https://github.com/JuergenGutsch/InetaDatabase/blob/master/InetaAdmin/src/InetaAdmin/scripts/Speaker/speaker.ts

@Injectable()
export class browserService {

    constructor(private _http: Http) { }

    private _browserUrl: string = 'http://localhost:4863/api/SurveyParticipant/GetBrowserInfo';



    getBrowser(): Observable<RootObject> {
        return this._http.get(this._browserUrl)
            .do(res => console.log('HTTP response:', res))
            .map(res => res.json())
            .do(console.log)
            .catch(this.handleError);
    }

    private handleError(error: any) {

        console.error('Post Error', error);
        console.log(error.message);
        return Observable.throw(error.statusText);
    }


}