import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { UserProfile } from '../../../_models/profile/userProfile';
import { TouchSequence } from '../../../../../node_modules/@types/selenium-webdriver';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

const userUrl = '//localhost:8080/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public updateUser(userProfile: UserProfile): Observable<UserProfile>{
    return this.http.post<UserProfile>(`${userUrl}/${userProfile.profileName.id}`, userProfile).pipe();
  }

  public getUser(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${userUrl}/${id}`);
  }

  public deleteUser(id: number): Observable<UserProfile>{
    return this.http.delete<UserProfile>(`${userUrl}/${id}`);
  }

}
