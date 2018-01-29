import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DashboardModel } from '../../models/dashboard.model';
import { surveypostService } from '../../services/surveypost.service';
import { surveyJsondwn } from '../../Interfaces/surveyJsondwn.interface';
import { NgForm } from '@angular/forms';
import { AccountService } from "../../services/account.service";
import { Survey } from '../../models/survey.model';
import { Permission } from '../../models/permission.model';

import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';


@Component({
    selector: 'surveyboardMaintain',
    templateUrl: './surveyboardMaintain.component.html',
    styleUrls: ['./surveyboardMaintain.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class SurveyBoardMaintain implements OnInit {
    model: surveyJsondwn;
    private surveyListdata: surveyJsondwn[];
    rows: surveyJsondwn[] = [];
    rowsCache: surveyJsondwn[] = [];
    errorMessage: any;
    deleteError: string;
    deleteId: number;
    isDeleting = false;
    createid: number = 0;
    loadingIndicator: boolean;


    constructor(private _surveypostservice: surveypostService, private router: Router, private alertService: AlertService, private accountService: AccountService) {  }


    ngOnInit() {
        this.model = {
            survey_Name: '',
            survey_Active: false,
            calAddressScore: true,
            calSocialScore: true,
            calAgeScore: true,
            calTwoFactorScore: false,
            redirectingUrl: ''
        }

        this.refreshSurveyList();
    }


    refreshSurveyList()
    {
        this._surveypostservice.getSurveyList()
            .subscribe
            (result => {
                this.surveyListdata = result;
                console.log("Survey List from getSurveyList() method - ", result);
            },
            error => this.errorMessage = <any>error
            );
    }
         
    cancelDelete() {
        this.isDeleting = false;
        this.deleteId = null;
    }


    deleteSurveyrow(row: surveyJsondwn) {
        this.alertService.showDialog('Are you sure you want to delete \"' + row.survey_Name + '\"?', DialogType.confirm, () => this.deleteSurveyHelper(row));
    }


    deleteSurveyHelper(row: surveyJsondwn) {
        this.alertService.startLoadingMessage("Deleting...");
        this.loadingIndicator = false;

        this._surveypostservice.deleteSurvey(row.surveyId).subscribe(results =>
        {
            var index = this.surveyListdata.indexOf(row , 0);
            console.log("the index is ....", index);
            if (index > -1) {
                this.surveyListdata.splice(index, 1);
                this.refreshSurveyList();
            }
            this.alertService.stopLoadingMessage();
            this.loadingIndicator = false;
         
        },
            error => {
                this.alertService.stopLoadingMessage();
                this.loadingIndicator = false;
                this.alertService.showStickyMessage("Delete Error", `An error occured while deleting the user `, MessageSeverity.error, error);
            });
      
    }


    editSurvey(id: number) {
       this.router.navigate(['/dashboard', id]);
    }

    CreateSurvey() {
        console.log("Create button clicked");
       // this.router.navigate(['/dashboard', this.createid]);
        this.router.navigate(['/createstudy', this.createid]);
    }




    }

