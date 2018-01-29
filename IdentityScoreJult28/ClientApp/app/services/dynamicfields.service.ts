import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { task } from '../Interfaces/task.interface';
import { url } from '../Interfaces/url.interface';

import { taskView } from '../Interfaces/taskView.interface'; 
import { urlView } from '../Interfaces/urlView.interface'; 

import { Observable } from "rxjs/Rx";
import { ConfigurationService } from './configuration.service';


@Injectable()
export class dynamicfieldsService {
    urlList: url[];
    taskList: task[];
    taskViewList: taskView[];
    urlViewList: urlView[];
    testSurveyID: number = 60;

   
    constructor(private _http: Http, private _configurations: ConfigurationService) { }

    private readonly _taskAllList: string = "/api/DynamicFieldsDTO/AllTaskList";
   // private readonly _taskUserslist: string = "/api/DynamicFieldsDTO/UserTaskList";
    private readonly _taskUserslist: string = "/api/DynamicFieldsDTO/UserTaskList";
    private readonly _AtInterviewsTaskList: string = "/api/DynamicFieldsDTO/AtInterviewsTaskList";

    private readonly _taskdelete: string = "/api/DynamicFieldsDTO/DeleteTask";
    private readonly _taskCreate: string = "/api/DynamicFieldsDTO/InsertTask";
    private readonly _taskUpdate: string = "/api/DynamicFieldsDTO/UpdateTask";
    private readonly _tasksumurl: string = "/api/DynamicFieldsDTO/UserSummaryTasks";
    // for updatnig the task list with the tasks in the survey
    private readonly _UsertaskUpdate: string = "/api/DynamicFieldsDTO/UpdateUserTaskView";
    //updating incomplete to complete
    private readonly _UserCompleteTask: string = "/api/DynamicFieldsDTO/UserCompleteTask";
    private readonly _AdminCompleteTask: string = "/api/DynamicFieldsDTO/AdminCompleteTask";
    

    //users url list
    private readonly _UserUrlUpdate: string = "/api/DynamicFieldsDTO/UpdateUserUrl";
    //updating incomplete to complete
    private readonly _UserCompleteUrl: string = "/api/DynamicFieldsDTO/UserCompleteUrl";
  
    private readonly _urlList: string = "/api/DynamicFieldsDTO/AllUrlList";
    private readonly _urldelete: string = "/api/DynamicFieldsDTO/DeleteUrl";
    private readonly _urlCreate: string = "/api/DynamicFieldsDTO/InsertUrl";
    private readonly _urlUpdate: string = "/api/DynamicFieldsDTO/UpdateUrl";
    
    get allTasksList() { return this._configurations.baseUrl + this._taskAllList; }
    get deleteTaskurl() { return this._configurations.baseUrl + this._taskdelete;}
    get createTaskurl() { return this._configurations.baseUrl + this._taskCreate; }
    get userTaskListurl() { return this._configurations.baseUrl + this._taskUserslist; }
    get AtInterviewsTaskListurl() { return this._configurations.baseUrl + this._AtInterviewsTaskList; }
    
    get UpdateTaskurl() { return this._configurations.baseUrl + this._taskUpdate; }
    get SummryTasks() { return this._configurations.baseUrl + this._tasksumurl;}

    get deleteUrl() { return this._configurations.baseUrl + this._urldelete; }
    get createurl() { return this._configurations.baseUrl + this._urlCreate; }
    get listurl() { return this._configurations.baseUrl + this._urlList; }
    get UpdateURL() { return this._configurations.baseUrl + this._urlUpdate; }

    get UpdateUserTaskurl() { return this._configurations.baseUrl + this._UsertaskUpdate; }
    get CompleteserTaskurl() { return this._configurations.baseUrl + this._UserCompleteTask; }
    get CompleteAdminTaskurl() { return this._configurations.baseUrl + this._AdminCompleteTask; }
    get UpdateUserSurveyUrl() { return this._configurations.baseUrl + this._UserUrlUpdate; }
    get CompletUserUrl() { return this._configurations.baseUrl + this._UserCompleteUrl; }

    private extractData(res: Response) {
        return res.text() ? res.json() : {};
    }

    private handleError(error: any) {
       
        console.error('Post Error', error);
        console.log(error.message);
        return Observable.throw(error.statusText);
    }

    

//Service For creating the survey
    public postTask(taskPost: task):Observable<any>
    {
       
        let body = JSON.stringify(taskPost); 
        let headers = new Headers({ 'content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("inside task post", body);
        let data = this._http.post(this.createTaskurl, body, options)
            .map(this.extractData)
            .catch(this.handleError);
     
        return data;
         
    }
    // Service for getting list of tasks All
    getAllTaskList(SurveyID: number): Observable<task[]> {
  
        return this._http.get(this.allTasksList + "/" + SurveyID ) 
            .map((res: Response) => {
                console.log("inside task getAll");
                let TaskAllList = <task[]>res.json();
                return TaskAllList;
            })
            .catch(this.handleError);
    }
  

    deleteTask(id: number): Observable<any> {
        let url = this.deleteTaskurl + '/' + id;
        console.log(url);
        return this._http.delete(url)
    }

    updateTask(taskupd: task): Observable<any> {
        return this._http.put(this.UpdateTaskurl + '/' + taskupd.taskId, taskupd)
            .map((res: Response) => {
                console.log('updateTask status:');
            })
            .catch(this.handleError);
    }


  //--------------------------------RELATED Survey URL ----------------------------------------

    public postUrl(urlPost: url): Observable<any> {

        let body = JSON.stringify(urlPost);
        let headers = new Headers({ 'content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        console.log("inside url post", body);
        let data = this._http.post(this.createurl, body, options)
            .map(this.extractData)
            .catch(this.handleError);

        return data;

    }

    deleteSurveyUrl(id: number): Observable<any> {
        let url = this.deleteUrl + '/' + id;
        console.log(url);
        return this._http.delete(url)
    }

    getAllUrlList(SurveyID: number): Observable<url[]> {

        return this._http.get(this.listurl + "/" + SurveyID)
            .map((res: Response) => {
                console.log("insideurl all", this.listurl + "/" + SurveyID);
                let urlList = <url[]>res.json();
                return urlList;
            })
            .catch(this.handleError);
    }

    updateSurveyUrl(Updurl: url): Observable<any> {
        return this._http.put(this.UpdateURL + '/' + Updurl.dynSurveyId, Updurl)
            .map((res: Response) => {
                console.log('updateTask status:');
            })
            .catch(this.handleError);
    }

    //----------------------------------USERS TASKS AND SURVEY URLS----------------------------------------------------------------
    // Service for getting list of tasks All
    getUserTaskList(SurveyID: number, Pid: number): Observable<taskView[]> {
        return this._http.get(this.userTaskListurl + "/" + SurveyID + "/" + Pid)
            .map((res: Response) => {
                this.taskViewList = <taskView[]>res.json();
                return this.taskViewList;
            })
            .catch(this.handleError);
    }

    //updating the user task specific
    userUpdateTask(usertask: taskView): Observable<any> {

        return this._http.put(this.CompleteserTaskurl + '/' + usertask.tid, usertask)
            .map((res: Response) => {
                console.log('updateTask status:', res);
            })
            .catch(this.handleError);
    }
    //get users Survey Urls
    AdminUpdateTask(usertask: taskView): Observable<any> {

        return this._http.put(this.CompleteAdminTaskurl + '/' + usertask.tid, usertask)
            .map((res: Response) => {
                console.log('updateTask status:', res);
            })
            .catch(this.handleError);
    }
    
    
    getUserCompleteUrlList(SurveyID: number, uid: number): Observable<urlView[]> {
        return this._http.get(this.UpdateUserSurveyUrl + "/" + SurveyID + "/" + uid)
            .map((res: Response) => {
                this.urlViewList = <urlView[]>res.json();
                return this.urlViewList;
            })
            .catch(this.handleError);
    }

    //updating the user task to complete
    userUpdateUrls(userUrl: urlView): Observable<any> {

        return this._http.put(this.CompletUserUrl + '/' + userUrl.uid, userUrl)
            .map((res: Response) => {
                console.log('updateurl from survey status:', res);
            })
            .catch(this.handleError);
    }
  
//------------------------------------------summary-----------------------------------------------------
   

    InterviewTaskList(SurveyID: number, Pid: number): Observable<taskView[]> {
        return this._http.get(this.AtInterviewsTaskListurl + "/" + SurveyID + "/" + Pid)
            .map((res: Response) => {
                this.taskViewList = <taskView[]>res.json();
                return this.taskViewList;
            })
            .catch(this.handleError);
    }

    //--vadatledu
    getUserSummaryTaskList(Pid: number): Observable<taskView[]> {
        return this._http.get(this.SummryTasks + "/" + Pid)
            .map((res: Response) => {
                this.taskViewList = <taskView[]>res.json();
                return this.taskViewList;
            })
            .catch(this.handleError);
    }

}

  


    
