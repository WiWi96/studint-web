import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { CompanyProfile } from '_models/profile/companyProfile';
import { Post } from '_models/post';
import { environment } from 'environments/environment';
import { Language } from '_models/skill/language';


const languageUrl = environment.apiEndpoint + '/country';

@Injectable()
export class CountryService {
  constructor(private http: HttpClient) {
  }

  public getAllLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(`${languageUrl}`);
  }
}