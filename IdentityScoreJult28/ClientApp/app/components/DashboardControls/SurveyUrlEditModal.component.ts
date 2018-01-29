import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy, ViewChild,ComponentFactoryResolver,ViewContainerRef } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'
import { ModalDirective } from 'ngx-bootstrap/modal';
import { url } from '../../Interfaces/url.interface'; 
import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';
import { dynamicfieldsService } from "../../services/dynamicfields.service";



@Component({
    selector: 'common-modal2',
    templateUrl: './SurveyUrlEditModal.component.html',
    styleUrls: ['./SurveyUrlEditModal.component.css'],
    
    changeDetection: ChangeDetectionStrategy.Default
})
export class SurveyUrlEditModal implements OnInit {
    @ViewChild('childModal2') public childModal2: ModalDirective;
    @Input() title?: string;

    model: url =
    {
        dynSurveyId: 0,
        surveyUrl: '',
        SurveyId: 0,
        SurveyDonebyUser: false
    }

  
   
    constructor(private route: ActivatedRoute, private alertService: AlertService, private dfService: dynamicfieldsService) {
    }

    ngOnInit() {
       // let id = this.route.snapshot.params['id'];
    }
    show(row: url) {
        console.log("inside show url  data", row);
        Object.assign(this.model, row);
       // this.model = row;
        console.log("inside show model2 data", this.model);
        this.childModal2.show();
    }
    hide() {
        this.childModal2.hide();
    }
    save()
    {
       
        this.dfService.updateSurveyUrl(this.model)
            .subscribe(
            response => console.log('successfully posted data'),
            error => console.log(error),
        )
        this.childModal2.hide();
     

    }

  
  }

