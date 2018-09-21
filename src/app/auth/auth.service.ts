import { Injectable } from '@angular/core';
import { TokenStorage } from 'app/auth/token-storage';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ReplaySubject } from '../../../node_modules/rxjs/ReplaySubject';
import { environment } from '../../environments/environment';
import { ProfileName } from '_models/profile/profileName';
import { UtilsService } from '_service/utils/utils.service';

export interface JwtToken {
    token: string;
    type: string;
}

@Injectable()
export class AuthService {
    jwtService = new JwtHelperService();
    permissionChanged: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    loggedUser: ProfileName;
    sub: any;

    constructor(private storage: TokenStorage, private http: HttpClient, private router: Router, private route: ActivatedRoute, private utils: UtilsService) { }

    isLogged(): boolean {
        let token = this.storage.getToken();
        return token != null && !this.jwtService.isTokenExpired(token);
    }

    logIn(username: string, password: string): Observable<any> {
        return this.http.post(`${environment.apiEndpoint}/signin`, { username: username, password: password });
    }

    storeToken(token: JwtToken) {
        this.storage.saveToken(token.token);
    }

    logOut() {
        this.storage.signOut();
        this.loggedUser = null;
        this.sub.unsubscribe();
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

    fetchUserProfileName() {
        this.sub = this.getLoggedProfile().subscribe(
            data => this.loggedUser = data,
            (error) => {console.log(error)}
        )
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

    public getLoggedProfile(): Observable<ProfileName> {
        return this.http.get<ProfileName>(`${environment.apiEndpoint}/profile`);
    }

    public goToUserProfile() {
        if (this.loggedUser) {
            this.router.navigate([this.utils.getUserRouterLink(this.loggedUser.type), this.loggedUser.id]);
        }
    }
}
