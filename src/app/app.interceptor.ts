import { TokenStorage } from './auth/token-storage';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { catchError } from '../../node_modules/rxjs/operators';
import { AuthService } from './auth/auth.service';
import 'rxjs/add/observable/throw';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {

  constructor(private token: TokenStorage, private router: Router, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpUserEvent<any>> {
    let authReq = req;
    if (this.token.getToken() != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken()) });
      console.log(this.token.getToken());
    }
    return <any>next.handle(authReq)
      .pipe(catchError(err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.authService.logOut();
            this.router.navigateByUrl('/login');
          }
          return Observable.throw(err);
        }
      }));
  }

}
