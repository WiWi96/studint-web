

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'ng5-auto-complete';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MomentModule } from 'ngx-moment';
import { FileSelectDirective } from '../../node_modules/ng2-file-upload';
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
import { WallComponent } from '_components/wall';
import { HomeComponent } from '_components/home/home.component';
import { ModalWindowComponent } from '_components/modal-window/modal-window.component';
import { ErrorsModule, ErrorsHandler, ErrorsComponent } from 'errors';
import { NotificationService } from '_service/notification/notification.service';
import { ErrorsService } from 'errors/errors-service/errors.service';
import { ProjectManagementComponent } from '_components/_management/project-management/project-management.component';
import { TeamManagementComponent } from '_components/_management/team-management/team-management.component';
import { UtilsService } from '_service/utils/utils.service';
import { CompanyUniversityEditModalComponent } from '_components/_forms/company-university-edit-modal/company-university-edit-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationBarComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    UniversityProfileComponent,
    ProjectProfileComponent,
    CompanyProfileComponent,
    StaticBarComponent,
    WallComponent,
    ModalWindowComponent,
    AddressFormComponent,
    ProjectManagementComponent,
    TeamManagementComponent
    FileSelectDirective,
    CompanyUniversityEditModalComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ErrorsModule,
    AngularSvgIconModule,
    MomentModule,
    NgbModule
  ],
  providers: [ErrorsService, NotificationService, UtilsService, CompanyProfileService, UniversityProfileService,
    SkillService, UserProfileService, ProjectProfileService,
    TeamService, PostService, MainPageService],
  bootstrap: [AppComponent],

  entryComponents: [
    ErrorsComponent, CompanyUniversityEditModalComponent
  ]
})
export class AppModule { }
