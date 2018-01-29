
import { ConfigurationService } from './configuration.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Rx";
import { EventModel } from "../models/event.model";
import { CalendarEventExtension, CalendarEventTimesChangedEventExtn } from '../interfaces/calendarEventExtn.interface';

@Injectable()
export class EventService {
   
    EventsArray: EventModel[] = [];

    constructor(private _http: Http, private _configurations: ConfigurationService) { }

    private readonly _alleventsurl: string = "/api/EventsDTO/EventsList";
    get allEventslink() { return this._configurations.baseUrl + this._alleventsurl; }

    private readonly _updateeventUrl: string = "/api/EventsDTO/UpdateEvent";
    get updateEventLink() { return this._configurations.baseUrl + this._updateeventUrl; }

    private readonly _inserteventUrl: string = "/api/EventsDTO/PostEvent";
    get postEventLink() { return this._configurations.baseUrl + this._inserteventUrl; }


    private readonly _deleteventUrl: string = "/api/EventsDTO/DeleteEvent";
    get deleteEventLink() { return this._configurations.baseUrl + this._deleteventUrl; }
    private extractData(res: Response) {
        return res.text() ? res.json() : {};
    }

    private handleError(error: any) {

        console.error('Post Error', error);
        console.log(error.message);
        return Observable.throw(error.statusText);
    }


    // ----------------- Sevices----------------------------------
    //Get Events List
    getAllEventsList(SurveyID: number): Observable<CalendarEventExtension[]> {

        return this._http.get(this.allEventslink + "/" + SurveyID)
            .map((res: Response) => {
                console.log("inside Events getAll");
                let EventsAllList = <Event[]>res.json();
                return EventsAllList;
            })
            .catch(this.handleError);
    }

    //Post Event

    public postEvent(eventPost: CalendarEventExtension ): Observable<any> {

        let body = JSON.stringify(eventPost);
        let headers = new Headers({ 'content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("inside event post", body);
        let data = this._http.post(this.postEventLink, body, options)
            .map(this.extractData)
            .catch(this.handleError);

        return data;

    }

    //Update Event

    updateEvent(eventupd: EventModel): Observable<any> {
        return this._http.put(this.updateEventLink + '/' + eventupd.eventId, eventupd)
            .map((res: Response) => {
                console.log('updateEvent status:');
            })
            .catch(this.handleError);
    }

    


}