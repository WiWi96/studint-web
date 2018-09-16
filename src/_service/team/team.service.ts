import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { CompanyProfile } from '_models/profile/companyProfile';
import { Post } from '_models/post';
import { Team } from '_models/team/team';
import { environment } from 'environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

const teamUrl = environment.apiEndpoint + '/team';

@Injectable()
export class TeamService {
  constructor(private http: HttpClient) { }

  // post requests
  public createPost(team: Team): Observable<Team> {
    return this.http.post<Team>(`${teamUrl}`, team);
  }

  //put requests
  public updateTeam(team: Team): Observable<Team> {
    return this.http.put<Team>(`${teamUrl}`, team);
  }

  //delete request
  public deleteTeam(id: number): Observable<Team> {
    return this.http.delete<Team>(`${teamUrl}/${id}`);
  }

  //get requests
  public getTeam(id: number): Observable<Team> {
    return this.http.get<Team>(`${teamUrl}/${id}`);
  }

  public getAllTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${teamUrl}`);
  }
}
