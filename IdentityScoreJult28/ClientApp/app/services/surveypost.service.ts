import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { surveyJsondwn } from '../Interfaces/surveyJsondwn.interface';
import { Observable } from "rxjs/Rx";
import { ConfigurationService } from './configuration.service';


@Injectable()
export class surveypostService {

    listodsurveys: surveyJsondwn[];

   
    constructor(private _http: Http, private _configurations: ConfigurationService) { }

    private readonly _surveyprops: string = "/api/OptionsDTO/CreateSurvey";
    private readonly _surveylist: string = "/api/OptionsDTO/SurveysList";
    private readonly _surveydelete: string = "/api/OptionsDTO/DeleteSurvey";
    private readonly _UpdateSurvey: string = "/api/OptionsDTO/UpdateSurvey";
    private readonly _getSurveybyID: string = "/api/OptionsDTO/GetSurvey";
    private readonly _checkifsurveynameexists: string = "/api/OptionsDTO/ValidateName";

    get surveypropsurl() { return this._configurations.baseUrl + this._surveyprops; }
    get surveyListurl() { return this._configurations.baseUrl + this._surveylist; }
    get surveyDeleteurl() { return this._configurations.baseUrl + this._surveydelete;}
    get surveyUpdateurl() { return this._configurations.baseUrl + this._UpdateSurvey; }
    get gsurveybyIdurl() { return this._configurations.baseUrl + this._getSurveybyID; }
    get ValidatSurveyexistsurl() { return this._configurations.baseUrl + this._checkifsurveynameexists; }



    private extractData(res: Response) {
        return res.text() ? res.json() : {};
    }

    private handleError(error: any) {
       
        console.error('Post Error', error);
        console.log(error.message);
        return Observable.throw(error.statusText);
    }

   public ValidateSurveName(SurveyName: string): Observable<any>
    {
       let url = this.ValidatSurveyexistsurl + '/' + SurveyName;
       console.log(url);
       return this._http.get(url)
           .map((res: Response) => {
               let surveyExist = res.json();
               console.log("Does the Survey Exists?", surveyExist);
               return surveyExist;
           })
           .catch(this.handleError);
   }
   

//Service For creating the survey
    public postSurveyData(surveypost: surveyJsondwn):Observable<any>
    {
        let body = JSON.stringify(surveypost); 
        let headers = new Headers({ 'content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("insider service post", body);
        let data = this._http.post(this.surveypropsurl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
        return data;
    }


    // Service for getting list of surveys
    getSurveyList(): Observable<surveyJsondwn[]> {
        return this._http.get(this.surveyListurl)
            .map((res: Response) => {
                let SurveysList = <surveyJsondwn[]>res.json();
                return SurveysList;
            })
            .catch(this.handleError);
    }

    deleteSurvey(id: number): Observable<any> {
        let url = this.surveyDeleteurl + '/' + id;
        console.log(url);
        return this._http.delete(url)
          //  .do(e => this.listodsurveys.splice(this.listodsurveys.findIndex(c => c.surveyId == id), 1));
           }


    updateSurvey(surveyupdata: surveyJsondwn): Observable<surveyJsondwn> {
        return this._http.put(this.surveyUpdateurl + '/' + surveyupdata.surveyId, surveyupdata)
            .map((res: Response) => {
                console.log('updateSurvey status:');
            })
            .catch(this.handleError);
    }

    getsurveybyid(id: number): Observable<surveyJsondwn> {
        let url = this.gsurveybyIdurl + '/' + id;
        console.log(url);
        return this._http.get(url)
            .map((res: Response) => {
                let surveybyid = res.json();
                return surveybyid;
            })
              .catch(this.handleError);
    }

   }


    
