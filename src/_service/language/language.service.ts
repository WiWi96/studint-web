import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { CompanyProfile } from '_models/profile/companyProfile';
import { Post } from '_models/post';
import { environment } from 'environments/environment';
import { Language } from '_models/skill/language';

const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };
  
  const languageUrl = environment.apiEndpoint + '/language';
  
  @Injectable()
export class LanguageService{
    constructor(private http: HttpClient){
    }

    public getAllLanguages(): Observable<Language[]> {
        return this.http.get<Language[]>(`${languageUrl}`);
      }
}