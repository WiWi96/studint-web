import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AutoCompleteModule } from 'ng5-auto-complete';
import { HTTP_INTERCEPTORS, HttpClientModule } from '../../node_modules/@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationBarComponent } from './_components/navigation-bar/navigation-bar.component';
import { FormsModule, ReactiveFormsModule } from '../../node_modules/@angular/forms';

// Services 
import { UserService } from './_services/profile/user/user.service';
import { CompanyService } from './_services/profile/company/company.service';
import { UniveristyService } from './_services/profile/university/university.service';
import { MainPageService } from './_services/mainpage/mainpage.service';

import { TestComponentComponent } from './_components/test-component/test-component.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient } from '../../node_modules/@types/selenium-webdriver/http';
import { LeftBarComponent } from './_components/left-bar/left-bar.component';
import { LoginComponent } from './_components/login';
import { RegisterComponent } from './_components/register';




@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    TestComponentComponent,
    LeftBarComponent,
    LoginComponent,
    RegisterComponent
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
  providers: [UserService, CompanyService, UniveristyService, MainPageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
