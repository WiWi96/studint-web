

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
import { AddressFormComponent } from '_components/_forms/add-form/address-form.component';
import { ErrorsModule, ErrorsHandler, ErrorsComponent } from 'errors';
import { NotificationService } from '_service/notification/notification.service';
import { ErrorsService } from 'errors/errors-service/errors.service';

// Security
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { TokenStorage } from 'app/auth/token-storage';
import { JwtModule } from '@auth0/angular-jwt';
import { jwtConfig } from './auth/jwtConfig';

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
    AddressFormComponent
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
    NgbModule,
    JwtModule.forRoot(jwtConfig),
  ],
  providers: [ErrorsService, NotificationService, CompanyProfileService, UniversityProfileService,
    SkillService, UserProfileService, ProjectProfileService,
    TeamService, PostService, MainPageService, AuthGuard, AuthService, TokenStorage],
  bootstrap: [AppComponent],

  entryComponents: [
    ErrorsComponent, AddressFormComponent
  ]
})
export class AppModule { }
