import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { DashboardModel } from '../../models/dashboard.model';
import { participantEndpointService } from '../../services/participantendpoint.service';
import { GetSurveyOptionsService } from '../../services/GetSurveyOptions.service';
import { NumberValidatorsService } from '../../services/numberValidator.service';
import { Imember, IPagedResults } from '../../interfaces/member.interface';
import { surveyoptions } from '../../Interfaces/surveyoptions.interface';
import { NgForm } from '@angular/forms';
import { userids } from '../../interfaces/userids.interface';
import { AuthService } from '../../services/auth.service';
import { dynamicfieldsService } from "../../services/dynamicfields.service";
import { ScheduleService } from "../../services/schedule.service";
import { taskView } from '../../Interfaces/taskView.interface'; 


@Component({
    selector: 'memberEdit',
    templateUrl: './memberEdit.component.html',
    styleUrls: ['./memberEdit.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class MemberEditComponent implements OnInit {
    _surveoptions: surveyoptions = {
        SurveyName: "",
        SurveyActive: true,
        CalAddressScore: true,
        CalSocialScore: true,
        CalAgeScore: true,
        CalTwoFactorScore: true
    };
    totalsum: number = 0;
    modelTask: taskView =
    {
        task: '',
        isDone: false,
        isAdmin: false,
        pid: 0,
        tid: 0,
        completeDate: ''

    }
    model: Imember = {
        particpantId: 1,
        firstName: ' ',
        lastName: ' ',
        emailAddress: ' ',
        password: ' ',
        phoneNumber: ' ',
        city: ' ',
        state: ' ',
        zip: ' ',
        genderIdentity: ' ',
        sexualOrientation: ' ',
        otherGenderType: ' ',
        otherSexualOrientation: ' ',
        otherRace: ' ',
        race: ' ',
        hispanic: ' ',
        age: ' ',
        date_of_Birth: null,
        ageValid: false,
        stateValid: false,
        cityValid: false,
        firstName_Match: false,
        lastName_Match: false,
        gender_Match: false,
        verified: false,
        //map GeoLocProps.cs
        geo_IP: ' ',
        geo_CountryName: ' ',
        geo_RegionName: ' ',
        geo_City: ' ',
        geo_ZipCode: ' ',
        geo_lattude: 10.0,
        geo_longitude: 10.0,
        //map userAgent Class
        browser: ' ',
        os: ' ',
        addrLatitude: 10.0,
        addrLongitude: 20,
        latlangMatch: 20,
        //Individual Score values
        addressScore: 20,
        socialScore: 20,
        ageScore: 20,
        twoFactorScore: 20,
        finalScaoreVal: 100,
        registerDate: ''
    };

    errorMessage: string;
    deleteMessageEnabled: boolean;
    operationText: string = 'Insert';
    member: Imember;
    private isSaving: boolean;
    taskrows: any[];
    userName: string;
    userStudyIds: userids;
   

    public changesSavedCallback: () => void;
    public changesFailedCallback: () => void;
    public changesCancelledCallback: () => void;

    constructor(private router: Router,
        private route: ActivatedRoute,
        private _memberservice: participantEndpointService, private alertService: AlertService,
        private GetSurveyOptionsService: GetSurveyOptionsService, private dfService: dynamicfieldsService, private authService: AuthService, private schserv: ScheduleService) { }
    public genderIdentityArray =
    [
        { value: 'Female', display: 'Female' },
        { value: 'Male', display: 'Male' },
        { value: 'TransFemale', display: 'Trans female/ Trans woman' },
        { value: 'TransMale', display: 'Trans male/ Trans man' },
        { value: 'GenderQueer', display: 'Genderqueer / Gender non- conforming' },
        { value: 'Other', display: 'Other' }
    ];
    public sexualOrientationIdentityArray =
    [
        { value: 'Straight', display: 'Straight/Heterosexual' },
        { value: 'Gay', display: 'Gay' },
        { value: 'Bisexual', display: 'Bisexual' },
        { value: 'SameGenderLoving', display: 'Same Gender Loving' },
        { value: 'Queer', display: 'Queer' },
        { value: 'Other', display: 'Other' }
    ];

    public RaceArray =
    [
        { value: 'Caucasian', display: 'White / Caucasian' },
        { value: 'MiddleEastern', display: 'Middle Eastern' },
        { value: 'AfricanAmerican', display: 'Black / African American' },
        { value: 'Asian', display: 'Asian / Pacific Islander' },
        { value: 'Other', display: 'Other' }
    ];
    public HispanicArray =
    [
        { value: 'Yes', display: 'Yes' },
        { value: 'No', display: 'No' }
    ];

    ngOnInit() {
        let id = this.route.snapshot.params['id'];
        if (id !== '0') {
            this.operationText = 'Update';
            this.getMember(id);
        }
        this.getSuyrveyById("SurveyTest02");
       

       // this.GetAllTaskTable(id);
    }

    getMember(id: number) {
        this._memberservice.getMemberbyid(id)
            .subscribe((member: Imember) => {
                this.model = member;
                this.getSurveysoftheUser();
                // console.log("loading the data by id", member)
            },
            (err: any) => console.log(err));
    }



    submitform(form: NgForm) {

        if (this.model.particpantId) {

            this._memberservice.updateMember(this.model)
                .subscribe((member: Imember) => {
                    console.log(this.model);
                    if (this.model) {
                        this.saveSuccessHelper();
                        this.router.navigate(['/participants']);
                    } else {
                        this.errorMessage = 'Unable to save customer';
                    }
                },
                (err: any) =>
                    this.saveFailedHelper(err)
                );

        }
    }

    cancel(event: Event) {
        event.preventDefault();
        this.router.navigate(['/participants']);
    }

    backbutton() {
        event.preventDefault();
        this.router.navigate(['/participants']);
    }

    private saveSuccessHelper() {
        this.isSaving = false;
        this.alertService.stopLoadingMessage();

        this.alertService.showMessage("Success", `Participant is updated successfully`, MessageSeverity.success);

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

    getSuyrveyById(SurveyName: string) {
        this.GetSurveyOptionsService.getSurveyOptions(SurveyName)
            .subscribe(
            (data) => {
                this._surveoptions = data;
                this.calValues(this._surveoptions);
            },
            error => console.log('error', error)
            );
    }

    calValues(data: any) {


        console.log(" Important Data related to Survey Options", data);

        if (data.calAddressScore === true) {
            this.totalsum = this.totalsum + 50;
            console.log("After Address val yes = ", this.totalsum);
        }
        else {
            this.totalsum = this.totalsum;
            console.log("After Address val No = ", this.totalsum);
        }
        if (data.calSocialScore === true) {
            this.totalsum = this.totalsum + 50;
            console.log("After social val Yes = ", this.totalsum);
        }
        else {
            this.totalsum = this.totalsum;
            console.log("After social val No = ", this.totalsum);
        }
        if (data.calAgeScore === true) {
            this.totalsum = this.totalsum + 15;
            console.log("After Age val Yes = ", this.totalsum);
        }
        else {
            this.totalsum = this.totalsum;
            console.log("After Age val No = ", this.totalsum);
        }

        console.log("TotalSum=", this.totalsum);
    }


    //-----------------Last Module -----------------------------------------

    //GetAllTaskTable(pid: number) {
    //    this.dfService.getUserSummaryTaskList(pid)
    //        .subscribe(result => {

    //            this.taskrows = result;
    //            console.log("Outputing the task list", this.taskrows);
    //        },
    //        error => this.errorMessage = <any>error
    //        );
    //}



    getSurveysoftheUser(): userids {
        this.userName = this.model.firstName + this.model.lastName;
        console.log("theusername is ", this.userName);
        return this.gettheUserIds(this.userName);

    }

   

    gettheUserIds(userfullname: string): userids {
        this.schserv.getPidSid(userfullname)
            .subscribe(result => {
                this.userStudyIds = result;
                console.log("Outputing userids", this.userStudyIds);
                // this.GetAllUrlsTable(this.userStudyIds.sid, this.userStudyIds.pid);
                this.GetAllTaskTable(this.userStudyIds.sid, this.userStudyIds.pid);
              
            },
            error => this.errorMessage = <any>error
            );
        return this.userStudyIds
    }


    GetAllTaskTable(sid: number, pid: number) {
        this.dfService.InterviewTaskList(sid, pid)
            .subscribe(result => {

                this.taskrows = result;
                console.log("Outputing the task list", this.taskrows);
            },
            error => this.errorMessage = <any>error
            );
    }



    completeTask(rowval: taskView) {
        console.log("the rowval properties", rowval);
        console.log("Its done", rowval.isDone);

        if (rowval.isDone == false) {

            this.modelTask.isDone = true;
            this.modelTask.pid = rowval.pid;
            this.modelTask.tid = rowval.tid;
            this.updateTaskinDB(this.modelTask);
            rowval.isDone = true;
        }
        else if (rowval.isDone == true) {

            this.modelTask.isDone = false;
            this.modelTask.pid = rowval.pid;
            this.modelTask.tid = rowval.tid;
            this.modelTask.completeDate = "";
            this.updateTaskinDB(this.modelTask);
            rowval.isDone = false;
        }

        this.getSurveysoftheUser();

    }


    updateTaskinDB(tvObj: taskView) {
        this.dfService.AdminUpdateTask(tvObj)
            .subscribe(result => {
                let tbool: boolean = result;
                console.log("Inside updating task view ", tbool);
            },
            error => this.errorMessage = <any>error
            );
    }

}