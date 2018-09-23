import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { ProjectProfile } from '_models/profile/projectProfile';
import { environment } from 'environments/environment';
import { ProjectInfo } from '_models/info/projectInfo';
import { ProjectTeams } from '_models/team/projectTeams';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

const projectUrl = environment.apiEndpoint + '/project';
const companyUrl = environment.apiEndpoint + '/company';

@Injectable()
export class ProjectProfileService {
  constructor(private http: HttpClient) { }

  // post requests
  public createProject(projectProfile: ProjectProfile): Observable<ProjectProfile> {
    return this.http.post<ProjectProfile>(`${projectUrl}`, projectProfile);
  }

  //put requests
  public updateProject(projectProfile: ProjectProfile): Observable<ProjectProfile> {
    return this.http.put<ProjectProfile>(`${projectUrl}`, projectProfile);
  }

  public updateProjectTeams(project: ProjectTeams): Observable<ProjectTeams> {
    return this.http.put<ProjectTeams>(`${projectUrl}/teams`, project);
  }

  //delete request
  public deleteProject(id: number): Observable<ProjectProfile> {
    return this.http.delete<ProjectProfile>(`${projectUrl}/${id}`);
  }

  //get requests
  public getProject(id: number): Observable<ProjectProfile> {
    return this.http.get<ProjectProfile>(`${projectUrl}/${id}`);
  }

  public getProjectTeams(id: number): Observable<ProjectTeams> {
    return this.http.get<ProjectTeams>(`${projectUrl}/${id}/teams`);
  }

  public getProjectsByCompany(): Observable<ProjectInfo[]> {
    return this.http.get<ProjectInfo[]>(`${companyUrl}/project`);
  }

  public getAllProjects(): Observable<ProjectProfile[]> {
    return this.http.get<ProjectProfile[]>(`${projectUrl}`);
  }

  public joinProject(id: number): Observable<ProjectProfile> {
    return this.http.get<ProjectProfile>(`${projectUrl}/${id}/enroll`);
  }

  public leaveProject(id: number): Observable<ProjectProfile> {
    return this.http.get<ProjectProfile>(`${projectUrl}/${id}/leave`);
  }
}
