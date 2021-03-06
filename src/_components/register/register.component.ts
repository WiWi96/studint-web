// @angular-core
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @rx-js
import { first } from 'rxjs/operators';

// @Services
//import { UserService } from '../../_services/user.service';
//import { AlertService } from '../../_services-authentication';

@Component({
    selector: 'app-login',
    templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        //private userService: UserService,
        // private alertService: AlertService
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            username: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });

    }

    // getter do wydobywania wartosci z formularza
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        //console.log(this.registerForm.value);

        this.loading = true;
        /* this.userService.addUser(this.registerForm.value)
             .pipe(first())
             .subscribe(
                 data => {
                     this.alertService.success('Registration successful', true);
                     this.router.navigate(['/login']);
                 },
                 error => {
                     this.alertService.error(error);
                     this.loading = false;
                 });*/
    }
}
