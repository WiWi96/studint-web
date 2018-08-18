import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormControl} from '@angular/forms';
import { AutoCompleteModule } from 'ng5-auto-complete';
import { TypeaheadModule } from 'ngx-bootstrap';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AutoCompleteModule,
    TypeaheadModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
