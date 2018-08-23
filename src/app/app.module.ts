

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms';
import { AutoCompleteModule } from 'ng5-auto-complete';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
// Services
import { UserService } from '../_service/profile/user/user.service';
import { CompanyService } from '../_service/profile/company/company.service';
import { UniversityService } from '../_service/profile/university/university.service';
import { MainPageService } from '../_service/mainpage/mainpage.service';
// Site components
import { NavigationBarComponent } from '../_components/navigation-bar/navigation-bar.component';
import { LoginComponent } from '../_components/login';
import { RegisterComponent } from '../_components/register';
import { UserProfileComponent} from '../_components/user-profile';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AutoCompleteModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [UserService, CompanyService, UniversityService, MainPageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
