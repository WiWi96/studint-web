import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { ProjectProfile } from '_models/profile/projectProfile';
import { Skill } from '_models/skill/skill';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token'
    })
};

const profileUrl = '//localhost:8080/skill';

@Injectable()
export class SkillService {
    constructor(private http: HttpClient) { }

    // post requests
    public createSkill(skill: Skill): Observable<Skill> {
        return this.http.post<Skill>(`${profileUrl}`, skill);
    }

    //put requests
    public updateSkill(skill: Skill): Observable<Skill> {
        return this.http.put<Skill>(`${profileUrl}`, skill);
    }

    //delete request
    public deleteSkill(id: number): Observable<Skill> {
        return this.http.delete<Skill>(`${profileUrl}/${id}`);
    }

    //get requests
    public getSkill(id: number): Observable<Skill> {
        return this.http.get<Skill>(`${profileUrl}/${id}`);
    }

    public getAllSkills(): Observable<Skill[]> {
        return this.http.get<Skill[]>(`${profileUrl}`);
    }
}
