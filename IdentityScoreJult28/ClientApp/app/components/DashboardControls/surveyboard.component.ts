
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
    selector: 'surveyboard',
    templateUrl: './surveyboard.component.html',
    styleUrls: ['./surveyboard.component.css'],
    
    changeDetection: ChangeDetectionStrategy.Default
})
export class SurveyBoardComponent implements OnInit {
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
            redirectingUrl: ''
        }

        let id = this._ActRoute.snapshot.params['id'];
        this.SurveyIDtoChild = id;
        if (id != 0)
        {
            this.operationText = 'Update Survey';
            this.getSurvey(id);
        }

        this.addComponent();
       // this.addSurveyLink();
        this.GetAllTaskTable(id);
       // this.GetUrlsTable(id);
    
    }


    getSurvey(id: number)
    {
        this._surveypostservice.getsurveybyid(id)
            .subscribe((selsurvey: surveyJsondwn) => {
                this.model = selsurvey;
                console.log("display model",this.model);
               },
            (err: any) => console.log(err));
       
    }

    submitdata(form: NgForm) {

        this.isSaving = true;
        this.alertService.startLoadingMessage("Saving changes...");
        if (this.model.surveyId) {

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

    //child component
    @ViewChild('parent', { read: ViewContainerRef }) container: ViewContainerRef;

    @ViewChild('Surveytoparent', { read: ViewContainerRef }) surveycontainer: ViewContainerRef;

    @ViewChild('childModal') childModal: TaskEditModal;
   // @ViewChild('childModal2') childModal2: SurveyUrlEditModal;

    addComponent() {

        var comp = this._cfr.resolveComponentFactory(SurveyDynamicsComponent);
        var expComponent = this.container.createComponent(comp);
        expComponent.instance._ref = expComponent;
        expComponent.instance._suveyID = this._ActRoute.snapshot.params['id'];

    }

  

    GetAllTaskTable(id: number) {
        this.dfService.getAllTaskList(id)
            .subscribe(result => {
                this.rows = result;
                console.log("Outputing the task list", id, this.rows);
            },
            error => this.errorMessage = <any>error
            );
    }


    DeleteTask(row: task) {
        this.alertService.showDialog('Are you sure you want to delete the task"?' + row.taskId, DialogType.confirm, () => this.deleteTaskHelper(row));
    }

    deleteTaskHelper(row: task) {
        this.dfService.deleteTask(row.taskId).subscribe(results => {
            var index = this.rows.indexOf(row, 0);
            console.log("the index is ....", index);
            if (index > -1) {
                this.rows.splice(index, 1);
                this.GetAllTaskTable(row.surveyId);
            }
            this.alertService.stopLoadingMessage();
            let id = this._ActRoute.snapshot.params['id'];
            this.GetAllTaskTable(id);

        },
            error => {
                this.alertService.stopLoadingMessage();

                this.alertService.showStickyMessage("Delete Error", `An error occured while deleting the user `, MessageSeverity.error, error);
            });

    }

    RefreshList() {
        let id = this._ActRoute.snapshot.params['id'];
        this.GetAllTaskTable(id);
    }


      //addSurveyLink()
    //{
    //    var comp = this._cfr.resolveComponentFactory(UrlDynamicsComponent);
    //    var surveyComponent = this.surveycontainer.createComponent(comp);
    //    surveyComponent.instance._ref = surveyComponent;
    //    surveyComponent.instance._suveyID = this._ActRoute.snapshot.params['id'];

    //}
    ////---------------------------------Url Helper Functions -----------------------------
    //GetUrlsTable(id: number)
    //{
    //    this.dfService.getAllUrlList(id)
    //        .subscribe(result => {

    //            this.rowsUrls = result;
    //            console.log("Outputing url rows", this.rowsUrls);
    //        },
    //        error => this.errorMessage = <any>error
    //        );
    //}


    //DeleteUrl(row: url) {
    //    this.alertService.showDialog('Are you sure you want to delete the task"?' + row.dynSurveyId, DialogType.confirm, () => this.deleteUrlHelper(row));
    // }

    //deleteUrlHelper(row: url) {
    //    this.dfService.deleteSurveyUrl(row.dynSurveyId).subscribe(results => {
    //        var index = this.rowsUrls.indexOf(row, 0);
    //        console.log("the index is ....", index);
    //        if (index > -1) {
    //            this.rowsUrls.splice(index, 1);
    //            this.GetAllTaskTable(row.SurveyId);
    //        }
    //        this.alertService.stopLoadingMessage();
    //        let id = this._ActRoute.snapshot.params['id'];
    //        this.GetUrlsTable(id);

    //    },
    //        error => {
    //            this.alertService.stopLoadingMessage();

    //            this.alertService.showStickyMessage("Delete Error", `An error occured while deleting the user `, MessageSeverity.error, error);
    //        });

    //}

    //RefreshUrls()
    //{
    //    let id = this._ActRoute.snapshot.params['id'];
    //    this.GetUrlsTable(id);
    //}

    // -----------------------Task Functions---------------------------------
  }

