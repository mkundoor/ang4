
//http://www.concretepage.com/angular-2/angular-2-http-get-parameters-headers-urlsearchparams-requestoptions-example
import { Component, Input, OnDestroy, OnInit, Pipe, PipeTransform } from "@angular/core";
import { AlertService, MessageSeverity, DialogType } from '../../services/alert.service';
import { ScheduleService } from "../../services/schedule.service";
import { dynamicfieldsService } from "../../services/dynamicfields.service";
import { task } from '../../Interfaces/task.interface';
import { url } from '../../Interfaces/url.interface'; 
import { urlView } from '../../Interfaces/urlView.interface'; 
import { taskView } from '../../Interfaces/taskView.interface'; 
import { userids } from '../../interfaces/userids.interface';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { iEventsViewModel } from '../../interfaces/ieventsviewmodel.interface';
import { DatePipe } from '@angular/common';

@Component({
    selector: "participant-page",
    templateUrl: './pageparticipant.component.html',
    styleUrls: ['./pageparticipant.component.css']
})


export class PageParticipantComponent implements OnInit {

   
    rowsUrls: urlView[] = [];
    taskrows: taskView[] = [];
    intuserlist: iEventsViewModel[] = [];
    userStudyIds: userids;
    errorMessage: any;
    userName: string;
    isSurvyUrl: boolean;
   
    thisbtnclicked: boolean = false;

    //model: urlView =
    //{
    //    url: '',
    //    urlisDone: false,
    //    urlisAdmin: false,
    //    pid: 0,
    //    uid: 0
    //}

    modelTask: taskView =
    {
        task: '',
        isDone: false,
        isAdmin: false,
        pid: 0,
        tid: 0,
        completeDate: ''
       
    }
    constructor(private alertService: AlertService, private _router: Router, private dfService: dynamicfieldsService, private authService: AuthService, private schserv: ScheduleService) {
  }


    ngOnInit() {
        this.getSurveysoftheUser();
      
      //  localStorage.setItem('userIDS', JSON.stringify(this.userStudyIds));
    }


    getSurveysoftheUser(): userids {
        this.userName = this.getuserName();
        console.log("theusername is ", this.userName);
      return  this.gettheUserIds(this.userName);
       
    }

    getuserName(): string {
        return this.authService.currentUser ? this.authService.currentUser.userName : "";
    }

    gettheUserIds(userfullname: string): userids
    {
        this.schserv.getPidSid(userfullname)
            .subscribe(result => {
                 this.userStudyIds = result;
                 console.log("Outputing userids", this.userStudyIds);
                // this.GetAllUrlsTable(this.userStudyIds.sid, this.userStudyIds.pid);
                 this.GetAllTaskTable(this.userStudyIds.sid, this.userStudyIds.pid);
                 this.GetUserInterviews(this.userStudyIds.pid);
                 },
            error => this.errorMessage = <any>error
        );
        return this.userStudyIds
    }


    GetAllTaskTable(sid: number, pid: number) {
        this.dfService.getUserTaskList(sid, pid)
            .subscribe(result => {

                this.taskrows = result;
                console.log("Outputing the task list", this.taskrows);
            },
            error => this.errorMessage = <any>error
            );
    }

    GetUserInterviews(pid: number) {
        this.schserv.getintuser(pid)
            .subscribe(result => {

                this.intuserlist = result;
                console.log("Outputing interview rows", this.intuserlist);
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

        this.getSurveysoftheUser();
               
    }


    updateTaskinDB(tvObj: taskView)
    {       
        this.dfService.userUpdateTask(tvObj)
            .subscribe(result => {
                let tbool: boolean = result;
                console.log("Inside updating task view ", tbool);
            },
            error => this.errorMessage = <any>error
            );
    }

  

   
 } 

