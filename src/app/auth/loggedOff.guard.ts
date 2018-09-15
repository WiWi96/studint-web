import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class LoggedOffGuard implements CanActivate {    

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        if (!this.authService.isLogged()) {
          return true;
        }
  
        this.router.navigate(['/mainpage']);
    }
}