import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { CompanyProfile } from '_models/profile/companyProfile';
import { Post } from '_models/post';
import { environment } from 'environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

const postUrl = environment.apiEndpoint + '/post';

@Injectable()
export class PostService {
  constructor(private http: HttpClient) { }

  // post requests
  public createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${postUrl}`, post);
  }

  //put requests
  public updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${postUrl}`, post);
  }

  //delete request
  public deletePost(id: number): Observable<Post> {
    return this.http.delete<Post>(`${postUrl}/${id}`);
  }

  //get requests
  public getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${postUrl}/${id}`);
  }

  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${postUrl}`);
  }

  public getPostsByProfile(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${postUrl}/profile/${id}`);
  }
}
