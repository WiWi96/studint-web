import { Interceptor } from './app.interceptor';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'ng5-auto-complete';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { NgbModule, NgbInputDatepicker, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MomentModule } from 'ngx-moment';
import { FileSelectDirective } from 'ng2-file-upload';
import { TypeaheadModule, ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InViewportModule } from 'ng-in-viewport';

// Services
import { CompanyProfileService } from '_service/profile/company/companyProfile.service';
import { UniversityProfileService } from '_service/profile/university/universityProfile.service';
import { UserProfileService } from '_service/profile/user/userProfile.service';
import { ProjectProfileService } from '_service/profile/project/projectProfile.service';
import { TeamService } from '_service/team/team.service';
import { SkillService } from '_service/skill/skill.service';
import { PostService } from '_service/post/post.service';
import { MainPageService } from '_service/mainpage/mainpage.service';

// Site components
import { NavigationBarComponent } from '_components/navigation-bar/navigation-bar.component';
import { LoginComponent } from '_components/login';
import { RegisterComponent } from '_components/register';
import { UserProfileComponent } from '_components/user-profile';
import { UniversityProfileComponent } from '_components/university-profile';
import { ProjectProfileComponent } from '_components/project-profile';
import { CompanyProfileComponent } from '_components/company-profile';
import { StaticBarComponent } from '_components/static-bar/static-bar.component';
import { WallComponent } from '_components/_posts/wall';
import { NewPostComponent } from '_components/_posts/new-post/new-post.component';
import { HomeComponent } from '_components/home/home.component';
import { ModalWindowComponent } from '_components/modal-window/modal-window.component';
import { ErrorsModule, ErrorsComponent } from 'errors';
import { NotificationService } from '_service/notification/notification.service';
import { ErrorsService } from 'errors/errors-service/errors.service';
import { ProjectManagementComponent } from '_components/_management/project-management/project-management.component';
import { TeamManagementComponent } from '_components/_management/team-management/team-management.component';
import { UtilsService } from '_service/utils/utils.service';
import { CompanyUniversityEditModalComponent } from '_components/_forms/company-university-edit-modal/company-university-edit-modal.component';
import { StudentEditModalComponent } from '_components/_forms/student-edit-modal/student-edit-modal.component';
import { LanguageService } from '_service/language/language.service';
import { EditorComponent } from '_components/_forms/editor/editor.component';


// Security
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { TokenStorage } from './auth/token-storage';
import { JwtModule } from '@auth0/angular-jwt';
import { jwtConfig } from './auth/jwtConfig';
import { MainpageComponent } from '_components/mainpage/mainpage.component';
import { LoggedOffGuard } from './auth/loggedOff.guard';
import { ProjectEditComponent } from '_components/_forms/project-edit/project-edit.component';
import { NgbDateISOParserFormatter } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date-parser-formatter';
import { ConfirmModalComponent } from '_components/_forms/confirm-modal/confirm-modal.component';
import { ProfileService } from '_service/profile/profile.service';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationBarComponent,
    LoginComponent,
    RegisterComponent,
    MainpageComponent,
    UserProfileComponent,
    UniversityProfileComponent,
    ProjectProfileComponent,
    CompanyProfileComponent,
    StaticBarComponent,
    WallComponent,
    NewPostComponent,
    ModalWindowComponent,
    ProjectManagementComponent,
    TeamManagementComponent,
    FileSelectDirective,
    CompanyUniversityEditModalComponent,
    StudentEditModalComponent,
    EditorComponent,
    ConfirmModalComponent,
    ProjectEditComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    EditorModule,
    PickerModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ErrorsModule,
    AngularSvgIconModule,
    MomentModule,
    InViewportModule,
    JwtModule.forRoot(jwtConfig),
    NgbModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' })

  ],
  providers: [ErrorsService, NotificationService, UtilsService, ProfileService, CompanyProfileService, UniversityProfileService,
    SkillService, UserProfileService, ProjectProfileService,
    TeamService, PostService, MainPageService, AuthGuard, , LoggedOffGuard, AuthService, TokenStorage, LanguageService, {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }, ],
  bootstrap: [AppComponent],

  entryComponents: [
    CompanyUniversityEditModalComponent, StudentEditModalComponent, ConfirmModalComponent, ProjectEditComponent,
  ]
})
export class AppModule { }
