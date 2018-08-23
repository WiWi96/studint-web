import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { UniversityProfile } from '../../../_models/profile/universityProfile';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

const universityUrl = '//localhost:8080/university';

@Injectable()
export class UniversityService {
  constructor(private http: HttpClient) { }

  public getUniversity(id: number): Observable<UniversityProfile> {
    return this.http.get<UniversityProfile>(`${universityUrl}/${id}`);
  }
}
