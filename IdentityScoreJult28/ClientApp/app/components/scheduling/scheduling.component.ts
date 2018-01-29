import { Router, ActivatedRoute } from '@angular/router';
import { Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { DomSanitizer } from "@angular/platform-browser";
import { ScheduleService } from '../../services/schedule.service';
import { surveyJsondwn } from '../../Interfaces/surveyJsondwn.interface';
import { surveypostService } from '../../services/surveypost.service';
import { iEventsViewModel } from '../../interfaces/ieventsviewmodel.interface';

@Component({
    selector: 'mwl-demo-component',
    templateUrl: './scheduling.component.html',
    styleUrls: ['./scheduling.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ScheduleComponent implements OnInit {
    SchedulerUrl;
    model: surveyJsondwn;
    private surveyListdata: surveyJsondwn[];
    nameId: number;
    errorMessage: any;
    theeventslist: iEventsViewModel[] = [];
  // urlval: string = 'http://localhost:50869/Home/Index?sid=';
    urlval: string ='http://appsdev.nursing.upenn.edu/schedule/home/index?sid=';
    calurl: string;
  //   defaulturl: string = 'http://localhost:50869/Start/Index';
    defaulturl: string = 'http://appsdev.nursing.upenn.edu/schedule/Start/Index';
    constructor(private _ActRoute: ActivatedRoute, private alertService: AlertService, private domSanitizer: DomSanitizer, private schService: ScheduleService, private _surveypostservice: surveypostService){}
    ngOnInit() {
        console.log("before running surveylist");
        this.getddlSurveyList();
        console.log("after running surveylist");
        this.SchedulerUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.defaulturl);
          }

    getddlSurveyList() {
       
        this._surveypostservice.getSurveyList()
            .subscribe
            (result => {
                this.surveyListdata = result;
                console.log("Survey List from getSurveyList() method - ", result);
            },
            error => this.errorMessage = <any>error
            );
    }

    selectName() {
        this.calurl = this.urlval + this.nameId;
        this.SchedulerUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.calurl);
       // this.EventsList(this.nameId);
      
    }

    //EventsList(surveyID:number) {

    //    this.schService.getEvents(surveyID)
    //        .subscribe
    //        (result => {
    //            this.theeventslist = result;
    //            console.log("Eventslist ", this.theeventslist);
    //        },
    //        error => this.errorMessage = <any>error
    //        );
    //}


 
   
}








