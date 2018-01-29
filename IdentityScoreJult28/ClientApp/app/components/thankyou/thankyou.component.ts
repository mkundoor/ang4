import { Component, OnInit } from '@angular/core';
import { fadeInOut } from '../../services/animations';
import { Router, ActivatedRoute } from '@angular/router';
import { SurveyDBService } from "../../services/survey-db.service";



@Component({
    selector: 'thankyou',
    templateUrl: './thankyou.component.html',
    styleUrls: ['./thankyou.component.css'],
    animations: [fadeInOut]
})
export class Thankyou implements OnInit {
    username: string;
    userscore: number;
    errorMessage: string;
    constructor(private _router: Router, private route: ActivatedRoute, private dbservice: SurveyDBService) {

    }
    ngOnInit() {
     
        this.username = this.route.snapshot.params['id'];
        console.log("the string from ngonit in thankyou.component.ts", this.username);
        this.GetscoreofUser(this.username);
        
    }

    GetscoreofUser(firstlast: string) {
        this.dbservice.getScorebyid(firstlast)
            .subscribe(result => {
                this.userscore = result;
                console.log("Inside the getscoreuser Outputing user score", this.userscore);
                this.redirectUser(this.userscore);
            },
            error => this.errorMessage = <any>error
            );
    }

    redirectUser(userscore: number) {
        
        if (userscore >= 20)
        {
            console.log("redirecting user to login ", userscore);
            this._router.navigateByUrl('/login');
        }
        else {
            console.log("the user score is redirecting to privay policy ", userscore);
            this._router.navigateByUrl('/privacy');
        }
    }
}