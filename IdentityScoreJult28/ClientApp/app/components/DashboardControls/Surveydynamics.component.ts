

//https://www.themarketingtechnologist.co/building-nested-components-in-angular-2/
import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { InputSwitchModule, InputTextModule } from 'primeng/primeng';
import { task } from '../../Interfaces/task.interface'; 
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { dynamicfieldsService } from "../../services/dynamicfields.service";


import { NgForm } from '@angular/forms';


@Component({
    selector: 'dynamic-entry',
    templateUrl: './surveydynamics.component.html',
    styleUrls: ['./surveydynamics.component.css']

})
export class SurveyDynamicsComponent  {
 
    @Input() SurveyIDtoChild: number;
    _suveyID: number;
    _ref: any;
    _task: task;

    ngOnInit() {
        this._task = {
            task: '',
            adminOnly: false,
            surveyId: 0,
            taskId: 0,
            taskDonebyUser:false
        }
    }

    constructor(private alertService: AlertService, private dfService: dynamicfieldsService) { }

    removeObject() {
        this._ref.destroy();
    }

    save() {
        this._task.surveyId = this._suveyID;
        this.dfService.postTask(this._task)
            .subscribe(
            response => console.log('successfully posted data'),
            error => console.log(error),
             )
        this.alertService.showMessage("Success", ' New Task added to Survey', MessageSeverity.success);
        this._ref.destroy();
    }

    
  }

