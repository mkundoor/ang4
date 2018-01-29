import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { scorecard } from '../interfaces/scorecard.interface';
import { Observable } from "rxjs/Rx";
import { ConfigurationService } from './configuration.service';
//https://github.com/JuergenGutsch/InetaDatabase/blob/master/InetaAdmin/src/InetaAdmin/scripts/Speaker/speaker.ts

@Injectable()
export class GetScoreService {

    constructor(private _http: Http, private _configurations: ConfigurationService) { }

    private readonly _CalcUrl: string = "/api/SurveyParticipant/getScore";

    get _surveyCalcUrl() { return this._configurations.baseUrl + this._CalcUrl; }
   

    

   

    getScore(): Observable<scorecard> {

        return this._http.get(this._surveyCalcUrl)
           // .do(res => console.log('HTTP response:', res))
            .map(res => res.json())
            //.do(console.log)
            .catch(this.handleError);
    }

    private handleError(error: any) {

        console.error('Post Error', error);
        console.log(error.message);
        return Observable.throw(error.statusText);
    }
   

}