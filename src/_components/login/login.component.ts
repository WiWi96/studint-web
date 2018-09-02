import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, JwtToken } from 'app/auth/auth.service';
import { first } from 'rxjs/operators';



@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
    loginFormGroup: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    username: string;
    password: string;

constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // reset login status
        //this.authenticationService.logout();

        // default to '/users/table'
        this.returnUrl = 'users/table';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginFormGroup.controls; }

    loginSubmitted() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginFormGroup.invalid) {
            return;
        }

        this.loading = true;
       /* this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    // this.router.navigate([this.returnUrl]);
                    console.log(this.returnUrl);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });*/
    }
    authenticate() {
        const returnUrl: string = this.route.snapshot.queryParams['returnUrl'];
    
        this.authService.logIn(this.username, this.password)
          .subscribe((resp: JwtToken) => {
            this.authService.storeToken(resp);
            this.router.navigateByUrl(returnUrl || '/mainpage');
            this.authService.refreshPermissions();
          }, (error) => {
            // TODO: handle invalid credentials
            this.username = '';
            this.password = '';
          });
      }
}
