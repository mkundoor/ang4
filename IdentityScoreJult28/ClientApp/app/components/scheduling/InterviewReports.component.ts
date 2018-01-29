import { Router, ActivatedRoute } from '@angular/router';
import { Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { DomSanitizer } from "@angular/platform-browser";
import { ScheduleService } from '../../services/schedule.service';
import { surveyJsondwn } from '../../Interfaces/surveyJsondwn.interface';
import { surveypostService } from '../../services/surveypost.service';
import { iEventsViewModel } from '../../interfaces/ieventsviewmodel.interface';

@Component({
    selector: 'int-report-component',
    templateUrl: './InterviewReports.component.html',
    styleUrls: ['./InterviewReports.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class InterviewReportsComponent implements OnInit {

    model: surveyJsondwn;
    private surveyListdata: surveyJsondwn[];
    nameId: number;
    errorMessage: any;
    theeventslist: iEventsViewModel[] = [];
 
    constructor(private _ActRoute: ActivatedRoute, private alertService: AlertService, private domSanitizer: DomSanitizer, private schService: ScheduleService, private _surveypostservice: surveypostService){}
    ngOnInit() {
        this.getddlSurveyList();
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
      
        this.EventsList(this.nameId);
      
    }

    EventsList(surveyID:number) {

        this.schService.getEvents(surveyID)
            .subscribe
            (result => {
                this.theeventslist = result;
                console.log("Eventslist ", this.theeventslist);
            },
            error => this.errorMessage = <any>error
            );
    }


 
   
}








