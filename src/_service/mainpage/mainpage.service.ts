import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { ProfileName } from '../../_models/profile/profileName';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

const mainPageUrl = '//localhost:8080/mainpage';

@Injectable()
export class MainPageService {

  constructor(private http: HttpClient) { }

  public getAllProfileNames(): Observable<ProfileName[]> {
    return this.http.get<ProfileName[]>(`${mainPageUrl}/${'profilenames'}`);
  }
}
