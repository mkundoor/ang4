import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { participant } from '../Interfaces/participant.interface';
import { Observable } from "rxjs/Rx";
import { ConfigurationService } from './configuration.service';

//https://github.com/JuergenGutsch/InetaDatabase/blob/master/InetaAdmin/src/InetaAdmin/scripts/Speaker/speaker.ts
@Injectable()
export class formposterinterface {

    public SurveyParticipant: participant;

    constructor(private http: Http, private _configurations: ConfigurationService) { }

    private readonly _surveyprops: string = "/api/SurveyParticipant/PostUser";
    //PostSurveyName
    private readonly _surveyname: string = "/api/SurveyParticipant/PostSurveyName";


    get participantposturl() { return this._configurations.baseUrl + this._surveyprops; }
    get postsurveynameurel() { return this._configurations.baseUrl + this._surveyname; }

    private extractData(res: Response)
    {
      return res.text() ? res.json() : {};
    }

    private handleError(error: any) {
       
        console.error('Post Error', error);
        console.log(error.message);
        return Observable.throw(error.statusText);
    }

  

   public postFormData(SurveyUser: participant):Observable<any>
   {
       let endpointurl = this.participantposturl;
       console.log(endpointurl);
        let body = JSON.stringify(SurveyUser);
        let headers = new Headers({ 'content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        
      //  console.log('Survey Participating User insider service layer', SurveyUser);
   
      //  console.log("inside Angular app");
        console.log(body);


        let data = this.http.post(endpointurl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
            return data;
    }

 

    
}