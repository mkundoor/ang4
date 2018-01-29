import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy, ViewChild,ComponentFactoryResolver,ViewContainerRef } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { task } from '../../Interfaces/task.interface';
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { dynamicfieldsService } from "../../services/dynamicfields.service";



@Component({
    selector: 'common-modal',
    templateUrl: './TaskEditModal.component.html',
    styleUrls: ['./TaskEditModal.component.css'],
    
    changeDetection: ChangeDetectionStrategy.Default
})
export class TaskEditModal implements OnInit {
    @ViewChild('childModal') public childModal: ModalDirective;
    @Input() title?: string;

    model: task =
    {
        task: '',
        adminOnly: true,
        surveyId: 0,
        taskId: 0,
        taskDonebyUser:false
    };
   
   
    constructor(private route: ActivatedRoute, private alertService: AlertService, private dfService: dynamicfieldsService) {
    }

    ngOnInit() {
       // let id = this.route.snapshot.params['id'];
    }
    show(row: task) {
        console.log("inside show task with row data", row);
        Object.assign(this.model, row);
       // this.model = row;
        console.log("inside show model data", this.model);
        this.childModal.show();
    }
    hide() {
        this.childModal.hide();
    }
    save()
    {
       
        this.dfService.updateTask(this.model)
            .subscribe(
            response => console.log('successfully posted data'),
            error => console.log(error),
        )
        this.childModal.hide();
     

    }

  
  }

