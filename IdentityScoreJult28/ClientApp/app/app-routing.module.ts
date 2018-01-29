// ======================================

// ======================================

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { CustomersComponent } from "./components/customers/customers.component";
import { ProductsComponent } from "./components/products/products.component";
import { OrdersComponent } from "./components/orders/orders.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { AboutComponent } from "./components/about/about.component";
import { Thankyou } from "./components/thankyou/thankyou.component";

import { NotFoundComponent } from "./components/not-found/not-found.component";
import { ParticipantComponent } from "./components/participant/participant.component";
import { ScoreComponent } from "./components/score/score.component";
import { Privacypolicy } from "./components/privacypolicy/privacypolicy.component";
import { ParticipantsListComponent } from "./components/participantslist/participantslist.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { CreateStudy } from "./components/DashboardControls/createsurvey.component";
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { SurveyBoardComponent } from "./components/DashboardControls/surveyboard.component";
import { SurveyBoardMaintain } from "./components/DashboardControls/surveyboardMaintain.component";
import { MemberManagement } from "./components/DashboardControls/memberManagement.component";
import { MemberEditComponent } from "./components/DashboardControls/memberEdit.component";
import { ScheduleComponent } from "./components/scheduling/scheduling.component";
import { AdminScheduleComponent } from "./components/scheduling/adminSchedule.component";
import { InterviewReportsComponent } from "./components/scheduling/InterviewReports.component";


import { PageParticipantComponent } from "./components/pageparticipant/pageparticipant.component";
import { UserDashComponent } from './components/UserDashboard/userdash.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: "", component: HomeComponent, canActivate: [AuthGuard], data: { title: "Home" } },
            { path: "login", component: LoginComponent, data: { title: "Login" } },
            { path: "customers", component: CustomersComponent, canActivate: [AuthGuard], data: { title: "Customers" } },
            { path: "products", component: ProductsComponent, canActivate: [AuthGuard], data: { title: "Products" } },
            { path: "orders", component: OrdersComponent, canActivate: [AuthGuard], data: { title: "Orders" } },
            { path: "settings", component: SettingsComponent, canActivate: [AuthGuard], data: { title: "Settings" } },
            { path: "about", component: AboutComponent, canActivate: [AuthGuard],data: { title: "About Us" } },
            { path: "thanks", component: Thankyou, data: { title: "Thank You" } },
            { path: "privacy", component: Privacypolicy, data: { title: "Privacy Policy" } },
            { path: "home", redirectTo: "/", pathMatch: "full" },
            { path: "register/:id", component: ParticipantComponent, data: { title: "Register Participant" } },
            { path: "usertasks", component: PageParticipantComponent, canActivate: [AuthGuard], data: { title: "UserTasks" } },
            { path: "score", component: ScoreComponent, canActivate: [AuthGuard],data: { title: "Score of the Participant" } },
            { path: "participantslist", component: ParticipantsListComponent, canActivate: [AuthGuard],data: { title: "List of Participants" } },
            { path: "dashboard/:id", component: SurveyBoardComponent, canActivate: [AuthGuard], data: { title: "Survey dashboard" } },
            //CreateStudy
            { path: "createstudy/:id", component: CreateStudy, canActivate: [AuthGuard], data: { title: "New Study" } },

            { path: "surveymaintain", component: SurveyBoardMaintain, canActivate: [AuthGuard] ,data: { title: "Survey Maintainance" } },
            { path: "participants", component: MemberManagement, canActivate: [AuthGuard],data: { title: "Participants" } },
            { path: "memberedit/:id", component: MemberEditComponent, canActivate: [AuthGuard], data: { title: "memberEdit" } },
            { path: "schedule", component: ScheduleComponent, canActivate: [AuthGuard], data: { title: "InterviewScheduler" } },
            { path: "interview", component: AdminScheduleComponent, canActivate: [AuthGuard], data: { title: "Admin Scheduler" } },
            { path: "reportschedules", component: InterviewReportsComponent, canActivate: [AuthGuard], data: { title: "Reports for Scheduler" } },
            

            { path: "userdash", component: UserDashComponent, canActivate: [AuthGuard], data: { title: "User Dashboard" } },
            { path: "**", component: NotFoundComponent, data: { title: "Page Not Found" } },
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthService, AuthGuard
    ]
})
export class AppRoutingModule { }