
import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy, ViewChild,ComponentFactoryResolver,ViewContainerRef } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { DashboardModel } from '../../models/dashboard.model';
import { surveypostService } from '../../services/surveypost.service';
import { surveyJsondwn } from '../../Interfaces/surveyJsondwn.interface';
import { SurveyDynamicsComponent } from './surveydynamics.component';
import { UrlDynamicsComponent } from './urldynamics.component';
import { dynamicfieldsService } from "../../services/dynamicfields.service";
import { task } from '../../Interfaces/task.interface';
import { url } from '../../Interfaces/url.interface'; 
import { NgForm } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { TaskEditModal } from './taskeditmodal.component';
import { SurveyUrlEditModal } from './SurveyUrlEditModal.component';


@Component({
    selector: 'createsurvey',
    templateUrl: './createsurvey.component.html',
    styleUrls: ['./createsurvey.component.css'],
    
    changeDetection: ChangeDetectionStrategy.Default
})
export class CreateStudy implements OnInit {
    model: surveyJsondwn;
    private isNewSurvey = false;
    private isSaving: boolean;
    errorMessage: any;
    SurveyIDtoChild: number;
    operationText: string = 'Create Study'

    public changesSavedCallback: () => void;
    public changesFailedCallback: () => void;
    public changesCancelledCallback: () => void;

    rows : task[] = [];
    rowsUrls : url[] = [];
    columns = [];
    taskDone = [];
    urlDone = [];


    constructor(private _surveypostservice: surveypostService, private _router: Router, private _ActRoute: ActivatedRoute, private alertService: AlertService, private _cfr: ComponentFactoryResolver, private dfService: dynamicfieldsService) { }
    private showErrorAlert(caption: string, message: string) {
        this.alertService.showMessage(caption, message, MessageSeverity.error);
    }
    private _taskList: task[];
    ngOnInit() {
        this.model = {
            survey_Name: '',
            survey_Active: true,
            calAddressScore: true,
            calSocialScore: true,
            calAgeScore: true,
            calTwoFactorScore: false,
            redirectingUrl:''
        }

        let id = this._ActRoute.snapshot.params['id'];
        this.SurveyIDtoChild = id;
        if (id != 0)
        {
            this.operationText = 'Update Survey';
            this.getSurvey(id);
        }

      
    
    }


    getSurvey(id: number)
    {
        this._surveypostservice.getsurveybyid(id)
            .subscribe((selsurvey: surveyJsondwn) => {
                this.model = selsurvey;
               },
            (err: any) => console.log(err));
       
    }

    submitdata(form: NgForm) {

        this.isSaving = true;
        this.alertService.startLoadingMessage("Saving changes...");
        if (this.model.surveyId) {
            console.log("update survey data", this.model);
            this._surveypostservice.updateSurvey(this.model)
                .subscribe
                (
                survey => this.saveSuccessHelper(survey),
                error => this.saveFailedHelper(error)
                )
            this.isNewSurvey = false;
        }
        else {

            this._surveypostservice.ValidateSurveName(this.model.survey_Name)
                .subscribe(
                result => this.InsertorDiscard(result),
                error => this.saveFailedHelper(error)
                )

           
        }
    }

    InsertorDiscard(surveyexists: boolean)
    {
        if (!surveyexists)
        {
            console.log("InsertSurvey ", this.model);
            this._surveypostservice.postSurveyData(this.model)
                .subscribe
                (
                response => this.saveSuccessHelper(),
                error => this.saveFailedHelper(error)
                )
            this.isNewSurvey = true;  
        }
        else
        {
            this.isSaving = false;
            this.alertService.stopLoadingMessage();
            this.alertService.showStickyMessage("Survey already Exists!!", "Please select a differnt Name", MessageSeverity.error);
            this.isNewSurvey = false;
            if (this.changesFailedCallback)
                this.changesFailedCallback();

        }

        this._router.navigate(['/surveymaintain']);
    }

    cancel(event: Event) {
        event.preventDefault();
        this._router.navigate(['/']);
    }

    backbutton()
    {
         this._router.navigate(['/surveymaintain']);
    }
  

    private saveSuccessHelper(survey?: surveyJsondwn) {
        if (survey)
           
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        
        if (this.isNewSurvey) {
            this.alertService.showMessage("Success", ' New Survey is created successfully', MessageSeverity.success);
            this.alertService.showMessage("For Survey List", ' Click on Survey List button', MessageSeverity.default);
        }
        else {
            this.alertService.showMessage("Success", `Survey is updated successfully`, MessageSeverity.success);
            this.alertService.showMessage("info", ' Click on Survey List button for list of surveys', MessageSeverity.default);
        }

        if (this.changesSavedCallback)
            this.changesSavedCallback();
    }
    private saveFailedHelper(error: any) {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Save Error", "The below errors occured whilst saving your changes:", MessageSeverity.error, error);
        this.alertService.showStickyMessage(error, null, MessageSeverity.error);

        if (this.changesFailedCallback)
            this.changesFailedCallback();
    }


  }

