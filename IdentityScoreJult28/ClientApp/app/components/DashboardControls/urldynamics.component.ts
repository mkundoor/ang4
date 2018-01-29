//https://www.themarketingtechnologist.co/building-nested-components-in-angular-2/
import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { InputSwitchModule, InputTextModule } from 'primeng/primeng';
import { url } from '../../Interfaces/url.interface'; 
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { dynamicfieldsService } from "../../services/dynamicfields.service";


import { NgForm } from '@angular/forms';


@Component({
    selector: 'url-entry',
    templateUrl: './urldynamics.component.html',
    styleUrls: ['./urldynamics.component.css']

})
export class UrlDynamicsComponent  {
   
    _suveyID: number;
    _ref: any;
    _url: url;
    private isSaving: boolean;

    ngOnInit() {
        this._url = {
            dynSurveyId: 0,
            surveyUrl: '',
            SurveyId: 0,
            SurveyDonebyUser:false
        }
    }

    constructor(private alertService: AlertService, private dfService: dynamicfieldsService) { }

    removeObject() {
        this._ref.destroy();
    }

    save() {
        this._url.SurveyId = this._suveyID;
        this.dfService.postUrl(this._url)
            .subscribe(
            response => console.log('successfully posted data'),
            error => console.log(error),
        )
        this.alertService.showMessage("Success", ' New Survey Url  added to Survey', MessageSeverity.success);
        this._ref.destroy();
    }



  
     

     
  }

