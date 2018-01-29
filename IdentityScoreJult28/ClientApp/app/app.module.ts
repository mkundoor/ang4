
// ======================================

import { NgModule, ErrorHandler } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';

import 'moment';
import 'bootstrap';
import 'fullcalendar';
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastyModule } from 'ng2-toasty';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from "ngx-bootstrap/tooltip";
import { PopoverModule } from "ngx-bootstrap/popover";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ChartsModule } from 'ng2-charts';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { FacebookModule } from 'ngx-facebook';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { MenuModule, InputSwitchModule, PanelModule, ChartModule, InputTextModule, ButtonModule, InputMaskModule, InputTextareaModule, EditorModule,RadioButtonModule, FieldsetModule, DropdownModule, MultiSelectModule, ListboxModule, SpinnerModule, SliderModule, RatingModule, DataTableModule, ContextMenuModule, TabViewModule, DialogModule, StepsModule, ScheduleModule, TreeModule, GMapModule, DataGridModule,  ConfirmationService, ConfirmDialogModule, GrowlModule, DragDropModule, GalleriaModule } from 'primeng/primeng';
import { PasswordStrengthBarModule } from 'ng2-password-strength-bar';

import { CalendarModule } from 'angular-calendar';
import { NgbModalModule, NgbDatepickerModule, NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { DemoUtilsModule } from './demo-utils/module';


import { FullCalendarModule } from 'ng-fullcalendar';



import { AppRoutingModule } from './app-routing.module';
import { AppErrorHandler } from './app-error.handler';
import { AppTitleService } from './services/app-title.service';
import { AppTranslationService, TranslateLanguageLoader } from './services/app-translation.service';
import { ConfigurationService } from './services/configuration.service';
import { AlertService } from './services/alert.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { EndpointFactory } from './services/endpoint-factory.service';
import { NotificationService } from './services/notification.service';
import { NotificationEndpoint } from './services/notification-endpoint.service';
import { AccountService } from './services/account.service';
import { AccountEndpoint } from './services/account-endpoint.service';
import { formposterinterface } from './services/formposter.service';
import { fbuserservice } from './services/FBUser.service';
import { GetScoreService } from './services/GetScores.service';
import { geolocationService } from './services/geolocation.service';
import { browserService } from './services/browser.service';
import { SurveyDBService } from './services/survey-db.service';
import { surveypostService } from './services/surveypost.service';
import { GetSurveyOptionsService } from './services/GetSurveyOptions.service';
import { participantEndpointService } from './services/participantendpoint.service';
import { DataFilterService } from './services/dataFilter.service';
import { Sorter } from './services/sorter.service';
import { TrackByService } from './services/trackby.service';
import { NumberValidatorsService } from './services/numberValidator.service';
import { dynamicfieldsService } from "./services/dynamicfields.service";
import { EventService } from "./services/eventservice";
import { ScheduleService } from "./services/schedule.service";


import { EqualValidator } from './directives/equal-validator.directive';
import { LastElementDirective } from './directives/last-element.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { BootstrapTabDirective } from './directives/bootstrap-tab.directive';
import { BootstrapToggleDirective } from './directives/bootstrap-toggle.directive';
import { BootstrapSelectDirective } from './directives/bootstrap-select.directive';
import { BootstrapDatepickerDirective } from './directives/bootstrap-datepicker.directive';
import { GroupByPipe } from './pipes/group-by.pipe';


import { AppComponent } from "./components/app.component";
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
import { PageParticipantComponent } from "./components/pageparticipant/pageparticipant.component";
import { ScoreComponent } from "./components/score/score.component";
import { ParticipantsListComponent } from "./components/participantslist/participantslist.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SurveyBoardComponent } from "./components/DashboardControls/surveyboard.component";
import { CreateStudy } from "./components/DashboardControls/createsurvey.component";
import { SurveyBoardMaintain } from "./components/DashboardControls/surveyboardMaintain.component";
import { MemberEditComponent } from "./components/DashboardControls/memberEdit.component";
import { MemberManagement } from "./components/DashboardControls/memberManagement.component";
import { PaginationComponent } from "./components/DashboardControls/pagination.component";
import { FilterTextboxComponent } from "./shared/filter-textbox.component";
import {CustomDateTimePickerComponent } from "./shared/custom-datetimepicker.component";
import { Privacypolicy } from "./components/privacypolicy/privacypolicy.component";
import { SurveyDynamicsComponent } from './components/DashboardControls/surveydynamics.component';
import { UrlDynamicsComponent } from './components/DashboardControls/urldynamics.component';
import { UserDashComponent } from './components/UserDashboard/userdash.component';
import { ScheduleComponent } from "./components/scheduling/scheduling.component";
import { AdminScheduleComponent } from "./components/scheduling/adminSchedule.component";
import { InterviewReportsComponent } from "./components/scheduling/InterviewReports.component";



import { BannerDemoComponent } from "./components/controls/banner-demo.component";
import { TodoDemoComponent } from "./components/controls/todo-demo.component";
import { StatisticsDemoComponent } from "./components/controls/statistics-demo.component";
import { NotificationsViewerComponent } from "./components/controls/notifications-viewer.component";
import { SearchBoxComponent } from "./components/controls/search-box.component";
import { UserInfoComponent } from "./components/controls/user-info.component";
import { UserPreferencesComponent } from "./components/controls/user-preferences.component";
import { UsersManagementComponent } from "./components/controls/users-management.component";
import { RolesManagementComponent } from "./components/controls/roles-management.component";
import { RoleEditorComponent } from "./components/controls/role-editor.component";
import { MembersGridComponent } from "./components/dashboardcontrols/members-grid.component";
import { ScheduleGridComponent } from "./components/scheduling/schedule-grid.component";
import { TaskEditModal } from "./components/dashboardcontrols/TaskEditModal.component";
import { SurveyUrlEditModal } from "./components/dashboardcontrols/SurveyUrlEditModal.component";
import { appointmentEditModal } from "./components/scheduling/appointmentEditModal.component";


import { NgProgressModule } from 'ng2-progressbar';

//import { MaterialModule } from '@angular/material';


@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        RecaptchaModule.forRoot(),
        RecaptchaFormsModule,
        PasswordStrengthBarModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: TranslateLanguageLoader
            }
        }),
        NgxDatatableModule,
        ToastyModule.forRoot(),
        TooltipModule.forRoot(),
        PopoverModule.forRoot(),
        BsDropdownModule.forRoot(),
        CarouselModule.forRoot(),
        ModalModule.forRoot(),
        DragAndDropModule,
        DatepickerModule.forRoot(),
        FacebookModule.forRoot(),
        ChartsModule,
        NgProgressModule,
        MenuModule,
        InputSwitchModule,
        PanelModule,
        ChartModule,
        InputTextModule,
        ButtonModule,
        InputMaskModule,
        InputTextareaModule,
        EditorModule,
        CalendarModule.forRoot(),
        NgbModalModule.forRoot(),
        NgbDatepickerModule.forRoot(),
        NgbTimepickerModule.forRoot(),
        RadioButtonModule,
        FieldsetModule,
        DropdownModule,
        MultiSelectModule,
        ListboxModule,
        SpinnerModule,
        SliderModule,
        RatingModule,
        DataTableModule,
        ContextMenuModule,
        TabViewModule,
        DialogModule,
        StepsModule,
        ScheduleModule,
        TreeModule,
        GMapModule,
        DataGridModule,
        ConfirmDialogModule,
        GrowlModule,
        DragDropModule,
        GalleriaModule,
   
        DemoUtilsModule,
        FullCalendarModule
      
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        CustomersComponent,
        ProductsComponent,
        OrdersComponent,
        SettingsComponent,
        UsersManagementComponent, UserInfoComponent, UserPreferencesComponent,
        RolesManagementComponent, RoleEditorComponent,
        AboutComponent,
        Thankyou,
        NotFoundComponent,
        ParticipantComponent,
        PageParticipantComponent,
        ScoreComponent,
        ParticipantsListComponent,
        PaginationComponent,
        FilterTextboxComponent,
        CustomDateTimePickerComponent,
        MembersGridComponent,
        ScheduleGridComponent,
        DashboardComponent,
        SurveyBoardComponent,
        CreateStudy,
        MemberManagement,
        SurveyBoardMaintain,
        MemberEditComponent,
        Privacypolicy,
        NotificationsViewerComponent,
        SearchBoxComponent,
        StatisticsDemoComponent, TodoDemoComponent, BannerDemoComponent,
        EqualValidator,
        LastElementDirective,
        AutofocusDirective,
        BootstrapTabDirective,
        BootstrapToggleDirective,
        BootstrapSelectDirective,
        BootstrapDatepickerDirective,
        GroupByPipe,
        SurveyDynamicsComponent,
        UrlDynamicsComponent,
        ScheduleComponent,
        AdminScheduleComponent,
        InterviewReportsComponent,
        TaskEditModal,
        SurveyUrlEditModal,
        UserDashComponent,
        appointmentEditModal
    ],

    entryComponents: [SurveyDynamicsComponent, UrlDynamicsComponent],
    providers: [
        formposterinterface,
        fbuserservice,
        GetScoreService,
        geolocationService,
        browserService,
        SurveyDBService,
        { provide: ErrorHandler, useClass: AppErrorHandler },
        AlertService,
        ConfigurationService,
        AppTitleService,
        AppTranslationService,
        NotificationService,
        surveypostService,
        GetSurveyOptionsService,
        participantEndpointService,
        NotificationEndpoint,
        AccountService,
        DataFilterService,
        AccountEndpoint,
        LocalStoreManager,
        EndpointFactory,
        Sorter,
        TrackByService,
        NumberValidatorsService,
        dynamicfieldsService,
        ConfirmationService,
        EventService,
        ScheduleService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

