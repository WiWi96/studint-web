import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { CompanyProfile } from '../../../_models/profile/companyProfile';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

const companyUrl = '//localhost:8080/company';

@Injectable()
export class CompanyService {
  constructor(private http: HttpClient) { }

  public getCompany(id: number): Observable<CompanyProfile> {
    return this.http.get<CompanyProfile>(`${companyUrl}/${id}`);
  }
}
