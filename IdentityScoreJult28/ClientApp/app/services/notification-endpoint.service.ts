

import { Injectable } from '@angular/core';
import { Response, ResponseOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';


@Injectable()
export class NotificationEndpoint {

    private demoNotifications = [
        {
            "id": 1,
            "header": "Eleigible Participants \"administrator\"",
            "body": "20 new eligible participants have enrolled for the Survey this week",
            "isRead": true,
            "isPinned": true,
            "date": "2017-05-28T16:29:13.5877958"
        },
        {
            "id": 2,
            "header": "Schedule Interviews",
            "body": "Please schedule interviews by May 24th 2018",
            "isRead": false,
            "isPinned": false,
            "date": "2017-05-28T19:54:42.4144502"
        },
        {
            "id": 3,
            "header": "Interview Cancelled",
            "body": "Interview scheduled on May 10th was cancelled by participant Joe.",
            "isRead": false,
            "isPinned": false,
            "date": "2017-05-30T11:13:42.4144502"
        }
    ];



    getNotificationEndpoint(notificationId: number): Observable<Response> {

        let notification = this.demoNotifications.find(val => val.id == notificationId);
        let response: Response;

        if (notification) {
            response = this.createResponse(notification, 200);
        }
        else {
            response = this.createResponse(null, 404);
        }

        return Observable.of(response);
    }



    getNotificationsEndpoint(page: number, pageSize: number): Observable<Response> {

        let notifications = this.demoNotifications;
        let response = this.createResponse(this.demoNotifications, 200);

        return Observable.of(response);
    }



    getUnreadNotificationsEndpoint(userId?: string): Observable<Response> {

        let unreadNotifications = this.demoNotifications.filter(val => !val.isRead);
        let response = this.createResponse(unreadNotifications, 200);

        return Observable.of(response);
    }



    getNewNotificationsEndpoint(lastNotificationDate?: Date): Observable<Response> {

        let unreadNotifications = this.demoNotifications;
        let response = this.createResponse(unreadNotifications, 200);

        return Observable.of(response);
    }



    getPinUnpinNotificationEndpoint(notificationId: number, isPinned?: boolean, ): Observable<Response> {

        let notification = this.demoNotifications.find(val => val.id == notificationId);
        let response: Response;

        if (notification) {
            response = this.createResponse(null, 204);

            if (isPinned == null)
                isPinned = !notification.isPinned;

            notification.isPinned = isPinned;
            notification.isRead = true;
        }
        else {
            response = this.createResponse(null, 404);
        }


        return Observable.of(response);
    }



    getReadUnreadNotificationEndpoint(notificationIds: number[], isRead: boolean, ): Observable<Response> {

        for (let notificationId of notificationIds) {

            let notification = this.demoNotifications.find(val => val.id == notificationId);

            if (notification) {
                notification.isRead = isRead;
            }
        }

        let response = this.createResponse(null, 204);
        return Observable.of(response);
    }



    getDeleteNotificationEndpoint(notificationId: number): Observable<Response> {

        let notification = this.demoNotifications.find(val => val.id == notificationId);
        let response: Response;

        if (notification) {
            this.demoNotifications = this.demoNotifications.filter(val => val.id != notificationId)
            response = this.createResponse(notification, 200);
        }
        else {
            response = this.createResponse(null, 404);
        }

        return Observable.of(response);
    }



    private createResponse(body, status: number) {
        return new Response(new ResponseOptions({ body: body, status: status }));
    }
}