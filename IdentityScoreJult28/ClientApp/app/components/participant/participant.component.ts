
import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { Location } from '@angular/common';
import { Utilities } from '../../services/utilities';
import { participant } from '../../Interfaces/participant.interface';
import { socialmediaprofile } from '../../Interfaces/socialmediaprofile.interface';
import { surveyoptions } from '../../Interfaces/surveyoptions.interface';
import { registerParticipant } from '../../models/register-participant.model';

import { EqualValidator } from '../../directives/equal-validator.directive';
import { BootstrapDatepickerDirective } from '../../directives/bootstrap-datepicker.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FacebookService, LoginResponse, LoginOptions, UIResponse, UIParams } from 'ngx-facebook';
import { formposterinterface } from '../../services/formposter.service';
import { fbuserservice } from '../../services/FBUser.service';
import { AccountEndpoint } from '../../services/account-endpoint.service';
import { GetSurveyOptionsService } from '../../services/GetSurveyOptions.service';
import { SurveyDBService } from "../../services/survey-db.service";
import { NgForm } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: "participant-register",
    templateUrl: './participant.component.html',
    styleUrls: ['./participant.component.css']
})




export class ParticipantComponent implements OnInit {
    activatedRoute: any;
    surveyNameId: string;
    authtoken: any;
    encstr: string;
    fbuser: { name: 'Hello' };
    public model: participant;
    public fbprofile: socialmediaprofile;
    private yy: number;
    private years: number[] = [];
    private _surveoptions: surveyoptions;
    private _surveyExists: boolean;
    errorMessage: any;
    private registerModel: registerParticipant;
    public barLabel: string = "Password strength:";
    redirecturl: string;
    userscore: number;
   

    constructor(private fb: FacebookService, private formpostService: formposterinterface, private alertService: AlertService, private fbuserservice: fbuserservice, private GetSurveyOptionsService: GetSurveyOptionsService, private _router: Router, private accountService: AccountEndpoint, private route: ActivatedRoute, private location: Location, private dbservice: SurveyDBService) {
        console.log('Initializing Facebook');
       
        fb.init({
           // appId:'315758988905035',
            appId: '134693047188510', //diane //134693047188510
           
           // appId:'203582670177190', //meg
            xfbml: true,
            version: 'v2.10'
        });
        
            }

    //----------------------------------------START FB---------------------------------------------------------------//
   
  loginWithFacebook(): void {

        const loginOptions: LoginOptions = {
            enable_profile_selector: true,
            return_scopes: true,
            scope: 'public_profile,user_friends,email,pages_show_list'
        };

         this.fb.login(loginOptions)
             .then((res: LoginResponse) => {
                 if (res.authResponse)
                 {

                     this.fb.api('/me?fields=id,first_name,last_name,name,gender,locale,age_range,verified,timezone,friends', this.authtoken)
                         .then((res: any) => {
                             console.log('Got the users profile', res);
                             this.fbprofile.id = res.id;
                             this.fbprofile.first_name = res.first_name;
                             this.fbprofile.last_name = res.last_name;
                             this.fbprofile.name = res.name;
                             this.fbprofile.gender = res.gender;
                             this.fbprofile.locale = res.locale;
                             this.fbprofile.age_range = "",
                             this.fbprofile.verified = res.verified;
                             this.alertService.showDialog('You are logged in to your facebook. Fetching your information from Facebook.... ');                          
                         })
                         .catch((error: any) => console.error(error));
                 }
                 else
                 {
                     this.alertService.showDialog('Error from res.authresp!! ');
                 }
             })

             .catch((ex) => {
                // this.alertService.showDialog('You cancelled login or did not fully authorize.Please login!! ');
                 console.log(ex);
               
           }),
           {
                 scope: 'publish_actions',
                 return_scopes: true
            };
                   
     }


    //-----------------------------------------END OF FB----------------------------------------------------------------//
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
        this.model = {
            FirstName: '',
            LastName: '',
            EmailAddress: '',
            Password: '',
            confirmPassword: '',
            PhoneNumber: '',
            phcode: '',
            City: '',
            State: '',
            Zip: null,
            GenderIdentity: null,
            SexualOrientation: null,//this.sexualOrientationIdentityArray[0].value,
            Race: null,//this.RaceArray[0].value,
            Hispanic: null,//this.HispanicArray[0].value,
            Age: null,
            Date_of_Birth: null,
            othergender: null,
            otherSex: null,
            otherRace: null,
            MonthofBirth: null,
            YearofBirth: null,
            captcha: ''

            //captchaVer:null
        }
        this.fbprofile = {
            id: '',
            name: '',
            first_name: '',
            last_name: ' ',
            age_range: ' ',
            gender: ' ',
            locale: ' ',
            picture: ' ',
            verified: ' ',
            friends:''
        }
        this.getYear();
        let surveyNameId = this.route.snapshot.params['id'];
        this.IsSuyrveyExist(surveyNameId);
      
    }

    IsSuyrveyExist(SurveyName: string) {
        this.GetSurveyOptionsService.CheckSurveyExists(SurveyName)
            .subscribe(
            data => {

                this._surveyExists = data;
                if (data == true)
                {
                    console.log("Data related to Survey Options", data);
                    console.log(SurveyName);
                  
                }
                else {
                    this.alertService.showDialog("The Survey you are looking  not doesn't exist!! ");
                    this._router.navigateByUrl('/thanks');
                }
               
            
                     },
            error => {
                console.log('error', error);
                this.alertService.showDialog("The Survey you are looking is not doesn't exist!! ");
                this._router.navigateByUrl('/thanks');
            }
         );
      }


    isLoading = false;
    formResetToggle = true;
    getYear()
    {
        var today = new Date();
        this.yy = today.getFullYear();
        for (var i = (this.yy - 100); i <= this.yy; i++)
        {
            this.years.push(i);
        }
    }

    //storing the user data
    submitform(form: NgForm) {
//for registering the user
        this.registerModel = new registerParticipant();
        this.registerModel.fullName = this.model.FirstName + " " + this.model.LastName;
        this.registerModel.email = this.model.EmailAddress;
        this.registerModel.roles = ["user"];
        this.registerModel.phoneNumber = this.model.PhoneNumber;
        this.registerModel.newpassword = this.model.Password;
        this.registerModel.userName = this.model.FirstName + this.model.LastName;
        this.registerModel.isEnabled = true;
        
//fb service

        this.fbuserservice.PostFBuserInfo(this.fbprofile)
            .subscribe(
            data => console.log('success', data),
            error => console.log('error', error)
        ) 


        let SurveyName = this.route.snapshot.params['id'];

        this.GetSurveyOptionsService.getSurveyOptions(SurveyName)
            .subscribe(
            data => {

                this._surveoptions = data;
                console.log("Data related to Survey Options", data);
                this.redirecturl = this._surveoptions.redirectingUrl;
                // this.redirectlogic(this._surveoptions.redirectingUrl);
            },
            error => console.log('error', error)
            );

        this.formpostService.postFormData(form.value)
            .subscribe
            (
            data => {
                console.log('success', data);
                this.registerUser(this.registerModel);
                this.encstr = this.model.FirstName + this.model.LastName;
                this.GetscoreofUser(this.encstr);
               },
            error => console.log('error', error )
        )

        //submitting the form name

            
    }

    registerUser(model: registerParticipant)
    {
        this.accountService.registerNewUserEndpoint(model)
            .subscribe
            (
            data => {                
                console.log('The user info is currently registered');
            },
            error => console.log('Error in regestering the user', error)
            )
    }


    GetscoreofUser(firstlast: string) {
        this.dbservice.getScorebyid(firstlast)
            .subscribe(result => {
                this.userscore = result;
                console.log("Inside the getscoreuser Outputing user score", this.userscore);
                this.redirectUser(this.userscore);
            },
            error => this.errorMessage = <any>error
            );
    }

    redirectUser(userscore: number) {

        if (userscore >= 20) {
            console.log("redirecting user to login ", userscore);
            this._router.navigateByUrl('/login');
        }
        else {
            console.log("the user score is redirecting to privay policy ", userscore);
       
            this._router.navigate(["/thanks"]).then(result => { window.location.href = this.redirecturl });

           
           // this._router.navigateByUrl('/privacy');
        }
    }
}

     
  


