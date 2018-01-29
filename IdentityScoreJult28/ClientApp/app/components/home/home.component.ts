/// 
// ======================================
// added participant 
// ======================================

import { Component, OnInit } from "@angular/core";

import { fadeInOut } from '../../services/animations';
import { ConfigurationService } from '../../services/configuration.service';
import { AuthService } from '../../services/auth.service';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    animations: [fadeInOut]
})
export class HomeComponent implements OnInit {
    constructor(private configurations: ConfigurationService, private authService: AuthService, private _router: Router)
    {
    }
    ngOnInit() {
       this.isroleTypeUser();
    }

     isroleTypeUser() {
        if (this.authService.currentUser.roles.some(r => r == 'user')) {
            this._router.navigateByUrl('/usertasks');
        }

    }

   
}
