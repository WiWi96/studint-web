import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { UserProfile } from '_models/profile/userProfile';
import { environment } from 'environments/environment';
import { Technology } from '_models/technology/technology';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Language } from '_models/skill/language';
import { Registration } from '_models/registration/registration';
import { UserRegistration } from '_models/registration/userRegistration';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

const userUrl = environment.apiEndpoint + '/user';

@Injectable()
export class UserProfileService {

  constructor(private http: HttpClient) { }

  //post requests
  public createUser(registrationUser: UserRegistration): Observable<UserProfile> {
    console.log(registrationUser);
    return this.http.post<UserProfile>(`${userUrl}`, registrationUser);
  }

  public updateFollower(id: number): Observable<boolean> {
    return this.http.post<boolean>(`${userUrl}/follower/${id}`, null);
  }

  //put requests
  public updateUser(userProfile: UserProfile): Observable<UserProfile> {
    
    return this.http.put<UserProfile>(`${userUrl}`, userProfile);
  }

  //delete requests
  public deleteUser(id: number): Observable<UserProfile> {
    return this.http.delete<UserProfile>(`${userUrl}/${id}`);
  }

  //get requests
  public getUser(id: number): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${userUrl}/${id}`);
  }

  public getAllUser(): Observable<UserProfile[]> {
    return this.http.get<UserProfile[]>(`${userUrl}`);
  }

  public getAllTechnology(): Observable<string[]> {
    return this.http.get<string[]>('../../../assets/technology.json');
  }

  public getAllUserTechnolgies(): Observable<string[]> {
    return this.http.get<string[]>('../../../assets/technology2.json');
  }

  public getAllLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>('../../../assets/languages.json');
  }
  
}
