import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { CompanyProfile } from '_models/profile/companyProfile';
import { Post } from '_models/post';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

const companyUrl = '//localhost:8080/post';

@Injectable()
export class CompanyProfileService {
  constructor(private http: HttpClient) { }

  // post requests
  public createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${companyUrl}`, post);
  }

  //put requests
  public updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${companyUrl}`, post);
  }

  //delete request
  public deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${companyUrl}/${id}`);
  }

  //get requests
  public getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${companyUrl}/${id}`);
  }

  public getAllPosts(): Observable<Post> {
    return this.http.get<Post>(`${companyUrl}`);
  }
}
