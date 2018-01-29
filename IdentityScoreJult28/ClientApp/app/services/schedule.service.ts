
import { Injectable } from "@angular/core";
import { ApptModel } from "../models/apptmodel";
import { EventModel } from "../models/event.model";
import { ConfigurationService } from './configuration.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { surveyJsondwn } from '../Interfaces/surveyJsondwn.interface';
import { iEventsViewModel } from '../interfaces/ieventsviewmodel.interface';
import { userids } from '../Interfaces/userids.interface';


 
@Injectable()
export class ScheduleService {
    listodsurveys: surveyJsondwn[];
    constructor(private _http: Http, private _configurations: ConfigurationService) { }

    private readonly _idUrl: string = "/api/ParticipantDTO/GetPidSid";
    get getidurl() { return this._configurations.baseUrl + this._idUrl; }

    private readonly _isBookedUrl: string = "/api/EventsDTO/IsBooked";
    get bookedurl() { return this._configurations.baseUrl + this._isBookedUrl; }

    private readonly _interviewsuser: string = "/api/EventsDTO/userinterviewlist";
    get intuserurl() { return this._configurations.baseUrl + this._interviewsuser; }

    private readonly _EventsList: string = "/api/EventsDTO/EventsList";
    get _EventsListurl() { return this._configurations.baseUrl + this._EventsList; }


    getintuser(pid: number): Observable<any> {


        let _Headers = new Headers();
        _Headers.set('Content-Type', 'application/json');
        let url = this.intuserurl + "/" + pid;
        console.log(url);
        let options = new RequestOptions({ headers: _Headers });
        return this._http.get(url, options)
            .map(res => res.json())
            .catch(this.handleError);


    }


    getEvents(sid: number): Observable<any> {


        let _Headers = new Headers();
        _Headers.set('Content-Type', 'application/json');
        let url = this._EventsListurl + "/" + sid;
        console.log(url);
        let options = new RequestOptions({ headers: _Headers });
        return this._http.get(url, options)
            .map(res => res.json())
            .catch(this.handleError);


    }






    getPidSid(userflname: string): Observable<any> {
        
           
        let _Headers = new Headers();
        _Headers.set('Content-Type', 'application/json');
        let url = this.getidurl + "/" + userflname;
        console.log(url);
        let options = new RequestOptions({ headers: _Headers });
        return this._http.get(url, options)
            .map(res => res.json())
            .catch(this.handleError);

        
    }





    getIsInterviewBooked( pid:number, sid:number): Observable<any> {
        let _Headers = new Headers();
        _Headers.set('Content-Type', 'application/json');
        let url = this.bookedurl + "/" + pid + "/" + sid;
        console.log(url);
        let options = new RequestOptions({ headers: _Headers });
        return this._http.get(url, options)
            .map(res => res.json())
            .catch(this.handleError);
    }



    private handleError(error: any) {
        console.log(error.message);
        return Observable.throw(error.statusText);
    }

     
}