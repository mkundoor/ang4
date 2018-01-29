import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ConfigurationService } from './configuration.service';
import { Observable } from "rxjs/Rx";
import { surveyoptions } from '../interfaces/surveyoptions.interface';


@Injectable()
export class GetSurveyOptionsService {

    constructor(private _http: Http, private _configurations: ConfigurationService) { }

    private readonly _surveyoptions: string = "/api/OptionsDTO/GetSurveyOptions";
    private readonly _surveyexists: string = "/api/OptionsDTO/ValidateName";
   
    get _surveyOptionsUrl() { return this._configurations.baseUrl + this._surveyoptions; }
    get _checkSurveyExists() { return this._configurations.baseUrl + this._surveyexists; }

    CheckSurveyExists(surveyname: string): Observable<boolean>
    {
        let _Headers = new Headers();
        _Headers.set('Content-Type', 'application/json');
        let url = this._checkSurveyExists + "/" + surveyname;
        console.log(url);
        let options = new RequestOptions({ headers: _Headers });
        return this._http.get(url, options)
            .map(res => res.json())
            .catch(this.handleError);

    }


    getSurveyOptions(surveyname: string): Observable<surveyoptions> {
        let _Headers = new Headers();
        _Headers.set('Content-Type', 'application/json');
        let url = this._surveyOptionsUrl + "/"+ surveyname; 
        console.log(url);
        let options = new RequestOptions({ headers: _Headers });
        return this._http.get(url, options)
            .map(res => res.json())
            .catch(this.handleError);
    }

    private handleError(error: any) {

        console.error('Get Error', error);
        console.log(error.message);
        return Observable.throw(error.statusText);
    }
   

}