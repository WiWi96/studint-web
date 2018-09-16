import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { UniversityProfile } from '_models/profile/universityProfile';
import { environment } from 'environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

const universityUrl = environment.apiEndpoint + '/university';

@Injectable()
export class UniversityProfileService {
  constructor(private http: HttpClient) { }

  //post requests
  public createUniversity(universityProfile: UniversityProfile): Observable<UniversityProfile> {
    return this.http.post<UniversityProfile>(`${universityUrl}`, universityProfile);
  }

  //put requests
  public updateUniversity(universityProfile: UniversityProfile): Observable<UniversityProfile> {
    return this.http.put<UniversityProfile>(`${universityUrl}`, universityProfile);
  }

  //delete requests
  public deleteUniversity(id: number): Observable<UniversityProfile> {
    return this.http.delete<UniversityProfile>(`${universityUrl}/${id}`);
  }

  //get requests
  public getUniversity(id: number): Observable<UniversityProfile> {
    return this.http.get<UniversityProfile>(`${universityUrl}/${id}`);
  }

  public getAllCompanies(): Observable<UniversityProfile[]> {
    return this.http.get<UniversityProfile[]>(`${universityUrl}`);
  }
}
