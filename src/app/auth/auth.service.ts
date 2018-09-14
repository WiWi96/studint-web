import { Injectable } from '@angular/core';
import { TokenStorage } from 'app/auth/token-storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReplaySubject } from '../../../node_modules/rxjs/ReplaySubject';
import { environment } from '../../environments/environment';

export interface JwtToken {
  token: string;
  type: string;
}

@Injectable()
export class AuthService {
  jwtService = new JwtHelperService();
  permissionChanged: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  constructor(private storage: TokenStorage, private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  isLogged(): boolean {
    return this.storage.getToken() != null;
  }

  logIn(username: string, password: string): Observable<any> {
    return this.http.post(`http://localhost:8080/signin`, { username: username, password: password });
  }

  storeToken(token: JwtToken) {
    this.storage.saveToken(token.token);
  }

  logOut() {
    this.storage.signOut();
  }

  getRoles(): string[] {
    let result: string[] = null;
    try {
      const token = this.jwtService.decodeToken(this.storage.getToken());
      result = token.scopes != null ? token.scopes.split(',') : null;
    } catch (error) {
    }
    return result;
  }

  getUser(): string {
    let result: string = null;
    try {
      const token = this.jwtService.decodeToken(this.storage.getToken());
      result = token.sub;
    } catch (error) {
    }
    return result;
  }

  isAdmin(): boolean {
    const roles: string[] = this.getRoles();
    return roles != null && roles.includes('ADMIN');
  }

  isManager(): boolean {
    const roles: string[] = this.getRoles();
    return roles != null && roles.includes('USER');
  }

  refreshPermissions() {
    this.permissionChanged.next(true);
  }
}
