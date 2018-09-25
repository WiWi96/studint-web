import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { CompanyProfile } from '_models/profile/companyProfile';
import { Post } from '_models/post';
import { environment } from 'environments/environment';
import { Language } from '_models/skill/language';
import { Country } from '_models/country';


const countryUrl = environment.apiEndpoint + '/country';

@Injectable()
export class CountryService {
  constructor(private http: HttpClient) {
  }

  public getAllCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(`${countryUrl}`);
  }
}