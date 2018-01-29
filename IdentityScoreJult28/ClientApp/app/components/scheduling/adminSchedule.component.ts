import { Router, ActivatedRoute } from '@angular/router';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { DomSanitizer } from "@angular/platform-browser";
import { userids } from '../../interfaces/userids.interface';
import { ScheduleService } from "../../services/schedule.service";
import { AuthService } from '../../services/auth.service';


@Component({
    selector: 'my-app',
    templateUrl: './adminSchedule.component.html',
    styleUrls: ['./adminSchedule.component.css']
})
export class AdminScheduleComponent implements OnInit {
    SchedulerUrl;
    userName: string;
    userStudyIds: userids;
    
    isintbooked: boolean;
    errorMessage: any;
  // urlval: string =  'http://localhost:50869/Client/Index?sid=';

    urlval: string = 'http://appsdev.nursing.upenn.edu/schedule/Client/index?sid=';
    calurl: string;
   // defaulturl: string = 'http://localhost:50869/contact/Index';
    defaulturl: string = 'http://appsdev.nursing.upenn.edu/schedule/contact/Index';
    constructor(private _ActRoute: ActivatedRoute, private alertService: AlertService, private domSanitizer: DomSanitizer, private authService: AuthService,private schserv: ScheduleService) { }
    ngOnInit() {
      //  let storedToken: userids  = JSON.parse( localStorage.getItem('userIDS'));
          this.getInterviewScheduler();       
    }

    getInterviewScheduler() {
        this.userName = this.getuserName();
        this.gettheUserIds(this.userName);
    }

    getiframeinfo(eventbooked: boolean) {
        
        if (eventbooked) {
            this.SchedulerUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.defaulturl);
            console.log("exists", this.SchedulerUrl);
        }
        else {
            this.SchedulerUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.urlval + this.userStudyIds.sid + '&pid=' + this.userStudyIds.pid + '&UserName='+ this.userName);
            console.log("fresh", this.SchedulerUrl);
        }

    }

    getuserName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

   

    gettheUserIds(userfullname: string): userids {
        this.schserv.getPidSid(userfullname)
            .subscribe(result => {
                this.userStudyIds = result;
                console.log("Outputing userids from function", this.userStudyIds);
                this.getIsEventBooked(this.userStudyIds);
               
                },
            error => this.errorMessage = <any>error
            );
        return this.userStudyIds
    }

    getIsEventBooked(ids: userids):boolean  {
        this.schserv.getIsInterviewBooked(ids.pid, ids.sid)
            .subscribe(result => {
                this.isintbooked = result;
                console.log("Interview Booked", this.isintbooked);
                this.getiframeinfo(this.isintbooked);
                          },
            error => this.errorMessage = <any>error
            );
        return this.isintbooked;
    }

}



    












