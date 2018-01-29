// ======================================

import { Component, Input, OnInit } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { scorecard } from '../../interfaces/scorecard.interface';
import { GetScoreService } from '../../services/GetScores.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { NgProgressService } from "ng2-progressbar";
import { geolocationService } from '../../services/geolocation.service';
import { Observable } from 'rxjs';
import { DbParticipant } from '../../interfaces/dbParticpant.interface';
import { AlertService, MessageSeverity } from '../../services/alert.service';
import { browserService } from '../../services/browser.service';
import { SurveyDBService } from "../../services/survey-db.service";

@Component({
    selector: 'score',
    templateUrl: './participantslist.component.html',
    styleUrls: ['./participantslist.component.css'],
    animations: [fadeInOut]
})
export class ParticipantsListComponent implements OnInit {

    constructor(private _browser: browserService, private surveydbservice: SurveyDBService, private alertService: AlertService) { }

    private dbparticipant: DbParticipant;
    errorMessage: any;

   
    ngOnInit(): void { }

    loadSurveyeeData() {
        this.surveydbservice.getSurveyParticipantList()
            .subscribe(result => {
                this.dbparticipant = result;
               },
            error => this.errorMessage = <any>error
            );

         }

 

  




  }


