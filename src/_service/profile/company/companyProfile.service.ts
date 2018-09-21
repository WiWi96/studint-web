import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { CompanyProfile } from '_models/profile/companyProfile';
import { environment } from 'environments/environment';
import { Registration } from '_models/registration/registration';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

const companyUrl = environment.apiEndpoint + '/company';

@Injectable()
export class CompanyProfileService {
  constructor(private http: HttpClient) { }

  // post requests
  public createCompany(companyRegistration: Registration): Observable<CompanyProfile> {
    return this.http.post<CompanyProfile>(`${companyUrl}`, companyRegistration);
  }

  //put requests
  public updateCompany(companyProfile: CompanyProfile): Observable<CompanyProfile> {
    debugger;
    return this.http.put<CompanyProfile>(`${companyUrl}`, companyProfile);
  }

  //delete request
  public deleteCompany(id: number): Observable<CompanyProfile> {
    return this.http.delete<CompanyProfile>(`${companyUrl}/${id}`);
  }

  //get requests
  public getCompany(id: number): Observable<CompanyProfile> {
    return this.http.get<CompanyProfile>(`${companyUrl}/${id}`);
  }

  public getAllCompanies(): Observable<CompanyProfile[]> {
    return this.http.get<CompanyProfile[]>(`${companyUrl}`);
  }
}
