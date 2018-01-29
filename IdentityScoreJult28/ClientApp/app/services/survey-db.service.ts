// ======================================
// Author: Meghna Reddy
// ======================================

import { Injectable, Injector } from '@angular/core';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ConfigurationService } from './configuration.service';
import { DbParticipant } from '../Interfaces/dbParticpant.interface';


@Injectable()
export class SurveyDBService  {
    public loadParticipant: DbParticipant;

    constructor(private _http: Http, private _configurations: ConfigurationService) { }
   
    private readonly _listSurveyyes: string = "/api/ParticipantDTO/GetSurveyees";
    private readonly _postSurveyee: string = "/api/ParticipantDTO/PostSurveyee";
    private readonly _getscore: string = "/api/ParticipantDTO/getscoreval";


    get surveyeeListUrl() { return this._configurations.baseUrl + this._listSurveyyes; }
    get postSurveyeeUrl() { return this._configurations.baseUrl + this._postSurveyee; }
    get getSurveyeeScore() { return this._configurations.baseUrl + this._getscore; }

    
    //---------------------------------Get SERVICES-------------------------------------------------------
    getSurveyParticipantList(): Observable<any> {
        let endpointurl = this.surveyeeListUrl;

                 return this._http.get(endpointurl)
               // .do(res => console.log('HTTP response from the DATABASE:', res))
                .map(res => res.json())
                //.do(console.log)
                .catch(this.handleError);
        

    }
    //--------------------------------------POST SERVICES--------------------------------------------------------
    postNewSurveyeeEndpoint(participant_data: DbParticipant): Observable<any> {
        let body = JSON.stringify(participant_data);
        let endpointurl = this.postSurveyeeUrl;
        let headers = new Headers({ 'content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
      //  console.log('INSIDE DB SERVICE', participant_data);
      //  console.log(body);
      

        return this._http.post(endpointurl, body , options)
           .map(this.extractData)
           .do(res => console.log('HTTP response:', res))
           .catch(this.handleError);
    }
    //------------------------------------get user score for redirecting qualified users-------------------------------------
    getScorebyid(id: string): Observable<any> {
        let url = this.getSurveyeeScore + '/' + id;
        console.log(url);
        return this._http.get(url)
            .map((res: Response) => {
                let scoreval = res.json();
                return scoreval;
            })
            .catch(this.handleError);
    }
  //-------------------------------------HANDLE ERRORS------------------------------------------------------------------------
    private extractData(res: Response) {
        //let body = res.json();
        //return body.fields || {};
        return res.text() ? res.json() : {};
    }

    private handleError(error: any) {
        console.log(error.message);
        return Observable.throw(error.statusText);
    }

  
  
}