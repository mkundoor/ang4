// ======================================

import { Component, Input, OnInit } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { scorecard } from '../../interfaces/scorecard.interface';
import { GetScoreService } from '../../services/GetScores.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { NgProgressService } from "ng2-progressbar";
import { geolocationService } from '../../services/geolocation.service';
import { Observable } from 'rxjs';
import { geopointers } from '../../interfaces/geopointers.interface';
import { RootObject } from '../../interfaces/browserRoot.interface';
import { browserService } from '../../services/browser.service';

import { AlertService, MessageSeverity } from '../../services/alert.service';
import { SurveyDBService } from "../../services/survey-db.service";
import { DbParticipant } from '../../interfaces/dbParticpant.interface';


@Component({
    selector: 'score',
    templateUrl: './score.component.html',
    styleUrls: ['./score.component.css'],
    animations: [fadeInOut]
})
export class ScoreComponent implements OnInit {

    constructor(private _scoreService: GetScoreService, private _geoservice: geolocationService, private _browser: browserService, private surveydbservice: SurveyDBService, private alertService: AlertService) { }
    score: scorecard;
    errorMessage: any;
    blogger = 'tester01'
    dataoutput: scorecard;

    //geolocation service variables
    geoprops: geopointers;
    geoLocs: geopointers;

    //Browser service variables
    browserprops: RootObject;
    browsertypes: RootObject;
    dbparticipant: DbParticipant;
   
    ngOnInit(): void {
    }

    loadUser() {

        this._geoservice.getGeoLocation()
            .subscribe(geoprops => {
                this.geoprops = geoprops;
                this.geoLocs = this.geoprops;
               // console.log("dataoutput vastunda leda geolocation", this.geoLocs);
            },
            error => this.errorMessage = <any>error
            );


        this._browser.getBrowser()
            .subscribe(browserprops => {
                this.browserprops = browserprops;
                this.browsertypes = this.browserprops;
              //  console.log("dataoutput vastunda leda browser info", this.browsertypes);
            },
            error => this.errorMessage = <any>error
            );

        this._scoreService.getScore()
            .subscribe(score => {
                this.score = score;
                this.dataoutput = this.score;
                //  console.log("dataoutput vastunda leda", this.dataoutput);
            },
            error => this.errorMessage = <any>error
            );
    }

    loadSurveyeeData()
    {
        
        this.alertService.startLoadingMessage();
        this.surveydbservice.getSurveyParticipantList()
            .subscribe(result => {
                this.dbparticipant = result;
                //console.log("dataoutput full participant", result);
                console.log("is dbparticipant loaded correctly??", result);
            },
            error => this.errorMessage = <any>error
            );

            //(results => this.onCurrentUserDataLoadSuccessful(), error => this.onCurrentUserDataLoadFailed(error));
    }

    private onCurrentUserDataLoadSuccessful() {
        this.alertService.stopLoadingMessage();
    }

    private onCurrentUserDataLoadFailed(error: any) {
        this.alertService.stopLoadingMessage();
        this.alertService.showStickyMessage("Load Error", `Unable to retrieve user data from the server.\r\nErrors`,
            MessageSeverity.error, error);
    }
            


    }



 


