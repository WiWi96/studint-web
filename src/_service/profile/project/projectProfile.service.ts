import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { ProjectProfile } from '_models/profile/projectProfile';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

const profileUrl = '//localhost:8080/project';

@Injectable()
export class ProjectProfileService {
  constructor(private http: HttpClient) { }

  // post requests
  public createProject(projectProfile: ProjectProfile): Observable<ProjectProfile> {
    return this.http.post<ProjectProfile>(`${profileUrl}`, projectProfile);
  }

  //put requests
  public updateProject(projectProfile: ProjectProfile): Observable<ProjectProfile> {
    return this.http.put<ProjectProfile>(`${profileUrl}`, projectProfile);
  }

  //delete request
  public deleteProject(id: number): Observable<ProjectProfile> {
    return this.http.delete<ProjectProfile>(`${profileUrl}/${id}`);
  }

  //get requests
  public getProject(id: number): Observable<ProjectProfile> {
    return this.http.get<ProjectProfile>(`${profileUrl}/${id}`);
  }

  public getAllProjects(): Observable<ProjectProfile[]> {
    return this.http.get<ProjectProfile[]>(`${profileUrl}`);
  }
}
