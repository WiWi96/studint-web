

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl, ReactiveFormsModule} from '@angular/forms';
import { AutoCompleteModule } from 'ng5-auto-complete';
import { TypeaheadModule } from 'ngx-bootstrap';


import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationBarComponent } from '../_components/navigation-bar/navigation-bar.component';
import { AppRoutingModule } from './app-routing.module';
import { UserService } from '../_service/profile/user/user.service';
import { CompanyService } from '../_service/profile/company/company.service';
import { UniveristyService } from '../_service/profile/university/university.service';
import { MainPageService } from '../_service/mainpage/mainpage.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from '../_components/login';
import { RegisterComponent } from '../_components/register';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
 
library.add(fas);

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FontAwesomeModule,
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
