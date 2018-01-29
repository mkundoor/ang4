import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { socialmediaprofile } from '../Interfaces/socialmediaprofile.interface';
import { Observable } from "rxjs/Rx";
import { ConfigurationService } from './configuration.service';
//https://github.com/JuergenGutsch/InetaDatabase/blob/master/InetaAdmin/src/InetaAdmin/scripts/Speaker/speaker.ts

@Injectable()
export class fbuserservice {

    public fbuserinfo: socialmediaprofile;


    constructor(private http: Http, private _configurations: ConfigurationService) { }

    private readonly _CalcUrl: string = "/api/SurveyParticipant/fbuserinfo";

    get _surveyCalcUrl() { return this._configurations.baseUrl + this._CalcUrl; }

    private extractData(res: Response) {
        return res.text() ? res.json() : {};
    }

    private handleError(error: any) {

        console.error('Post Error', error);
        console.log(error.message);
        return Observable.throw(error.statusText);
    }

    public PostFBuserInfo(FBUser: socialmediaprofile): Observable<any> {
        let body = JSON.stringify(FBUser);
        let headers = new Headers({ 'content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data = this.http.post(this._surveyCalcUrl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
        return data;
    }

   


}