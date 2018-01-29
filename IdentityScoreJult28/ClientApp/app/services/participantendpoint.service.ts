import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Imember, IPagedResults } from '../interfaces/member.interface';
import { Observable } from "rxjs/Rx";
import { ConfigurationService } from './configuration.service';


@Injectable()
export class participantEndpointService {

    membersList: Imember[];

   
    constructor(private _http: Http, private _configurations: ConfigurationService) { }

  
    private readonly _memberlist: string = "/api/ParticipantEndpoint/MembersList";
    private readonly _DeleteMember: string = "/api/ParticipantEndpoint/DeleteMember";
    private readonly _UpdateMember: string = "/api/ParticipantEndpoint/UpdateMember";
    private readonly _getMemberbyID: string = "/api/ParticipantEndpoint/getMemberbyid";
    private readonly _checkMemberExists: string = "/api/ParticipantEndpoint/ValidateName";
    private readonly _page: string = "/api/ParticipantEndpoint/GetMemberesListPages";
    private readonly _fullList: string = "/api/ParticipantEndpoint/GetAllMembers";


   
    get membersListurl() { return this._configurations.baseUrl + this._memberlist; }
    get memberDeleteurl() { return this._configurations.baseUrl + this._DeleteMember;}
    get memberUpdateurl() { return this._configurations.baseUrl + this._UpdateMember; }
    get memberbyIdurl() { return this._configurations.baseUrl + this._getMemberbyID; }
    get ValidatMemberExistsurl() { return this._configurations.baseUrl + this._checkMemberExists; }
    get pageUrl() { return this._configurations.baseUrl + this._page; }
    get fullListUrl() { return this._configurations.baseUrl + this._fullList;}


    private extractData(res: Response) {
        return res.text() ? res.json() : {};
    }

    private handleError(error: any) {
       
        console.error('Post Error', error);
        console.log(error.message);
        return Observable.throw(error.statusText);
    }

   public ValidateMemberemail(email: string): Observable<any>
    {
       let url = this.ValidatMemberExistsurl + '/' + email;
       console.log(url);
       return this._http.get(url)
           .map((res: Response) => {
               let memberExist = res.json();
               console.log("Does the Member Exist?", memberExist);
               return memberExist;
           })
           .catch(this.handleError);
   }
   

    // Service for getting list of surveys
   getMembersList(): Observable<Imember[]> {
       return this._http.get(this.membersListurl)
            .map((res: Response) => {
                let membersList = <Imember[]>res.json();
                return membersList;
            })
            .catch(this.handleError);
    }

    deleteMember(id: number): Observable<any> {
        let url = this.memberDeleteurl+'/'+ id;
        console.log(url);
        return this._http.delete(url)
               }


    updateMember(memberupdata: Imember): Observable<Imember> {
        return this._http.put(this.memberUpdateurl + '/' + memberupdata.particpantId, memberupdata)
            .map((res: Response) => {
                
                console.log('Update Member status:');
              
            })
            .catch(this.handleError);
    }

    getMemberbyid(id: number): Observable<Imember> {
        let url = this.memberbyIdurl + '/' + id;
        console.log(url);
        return this._http.get(url)
            .map((res: Response) => {
                let memberbyid = res.json();
                return memberbyid;
            })
              .catch(this.handleError);
    }

    getfullList(): Observable<Imember[]> {
        return this._http.get(this.fullListUrl)
            .map((res: Response) => {
                let totallist = res.json();
                return totallist;
            })
            .catch(this.handleError);
    }

    getMemberssPage(page: number, pageSize: number): Observable<IPagedResults<Imember[]>> {
        return this._http.get(`${this.pageUrl}/page/${page}/${pageSize}`)
            .map((res: Response) => {
                const totalRecords = +res.headers.get('x-inlinecount');
                let members = res.json();
                console.log("from service", members);
               // this.calculateCustomersOrderTotal(customers);
                return {
                    results: members,
                    totalRecords: totalRecords
                };
            })
            .catch(this.handleError);
    }


   }


    
