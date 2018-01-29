
import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser'
import { ReactiveFormsModule, FormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { participantEndpointService } from '../../services/participantendpoint.service';
import { Imember, IPagedResults } from '../../interfaces/member.interface';
import { NgForm } from '@angular/forms';
import { AccountService } from "../../services/account.service";
import { DataFilterService } from "../../services/dataFilter.service";
import { Permission } from '../../models/permission.model';

import { AlertService, DialogType, MessageSeverity } from '../../services/alert.service';


@Component({
    selector: 'memberManagement',
    templateUrl: './memberManagement.component.html',
    styleUrls: ['./memberManagement.component.css'],
    changeDetection: ChangeDetectionStrategy.Default
})
export class MemberManagement implements OnInit {
    title: string;
    member: Imember;
    memberList: Imember[] = [];
    filteredList: Imember[] = [];
    fullList: Imember[] = [];
    totalRecords: number = 0;
    pageSize: number = 15;

 constructor(private _memberservice: participantEndpointService, private router: Router, private alertService: AlertService, private accountService: AccountService, private dataFilter: DataFilterService) {  }


 ngOnInit()
   {
    this.title = 'Participants';
    this.getMembersPage(1);
    this.getfullList();
    }

    getMembersPage(page: number) {
        this._memberservice.getMemberssPage((page - 1) * this.pageSize, this.pageSize)
            .subscribe((response: IPagedResults<Imember[]>) => {
                this.memberList = this.filteredList = response.results;
                this.totalRecords = response.totalRecords;
                console.log("members from fil", this.memberList);
                console.log("the response page result ", response.results);
                console.log("Total Records", response.totalRecords);
            },
            (err: any) => console.log(err),
            () => console.log('getCustomersPage() retrieved customers'));
 }

    getfullList() {
        this._memberservice.getfullList()
            .subscribe((response: Imember[]) => {
                this.fullList = response;
            },
            (err: any) => console.log(err));

    }
    

    filterChanged(filterText: string) {
        if (filterText && this.memberList) {
            let props = ['firstName', 'lastName'];
            this.filteredList = this.dataFilter.filter(this.fullList, props, filterText);
        }
        else {
            this.filteredList = this.memberList;
        }
    }

    pageChanged(page: number) {
        this.getMembersPage(page);
    }
}

