import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { CompanyProfile } from '_models/profile/companyProfile';
import { Post } from '_models/post';
import { environment } from 'environments/environment';
import { Language } from '_models/skill/language';
import { Course } from '_models/course';


const coursUrl = environment.apiEndpoint + '/courses';

@Injectable()
export class CoursService {
  constructor(private http: HttpClient) {
  }

  public getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${coursUrl}`);
  }
}