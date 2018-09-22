import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { ProfileName } from '_models/profile/profileName';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

const profileUrl = environment.apiEndpoint + '/profile';

@Injectable()
export class ProfileService {

  constructor(private http: HttpClient) { }

  //post requests
  public updateFollower(id: number): Observable<boolean> {
    return this.http.post<boolean>(`${profileUrl}/follower/${id}`, null);
  }

  // get requests
  public findProfilesWithNameContaining(name: string): Observable<ProfileName[]> {
    return this.http.get<ProfileName[]>(`${profileUrl}/${name}`);
  }

}
