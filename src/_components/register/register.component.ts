// ts-ignore
import { NgModule, Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule, FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";


@Component({
  selector: 'app-login',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  submittedStudent: boolean = false;
  submittedUniversity: boolean = false;

  registrationFormGroup: FormGroup;
  //universityRegistrationForm: FormGroup;
  //comapnyRegistrationForm: FormGroup;

  passwordFormGroup: FormGroup;

  addressFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) {

  }

  ngOnInit() {
    this.passwordFormGroup = this.formBuilder.group({
      'password': ['', Validators.required],
      'repeatPassword': ['', Validators.required]
    }, {
        validator: RegistrationValidator.validate.bind(this)
      });

    this.registrationFormGroup = this.formBuilder.group({
      'email': ['', [Validators.required, Validators.email]],
      'passwordFormGroup': this.passwordFormGroup.get('password')
    });

    this.addressFormGroup = this.formBuilder.group({
      'town': ['', [Validators.required]],
      'postCode': ['', [Validators.required]],
      'street': ['', [Validators.required]],
      'country': ['', [Validators.required]],
      'houseNo': ['', [Validators.required]],
    })


  }

  get f() { return this.registrationFormGroup.controls; }


  onSubmitStudent() {
    this.submittedStudent = true;

    if (this.registrationFormGroup.invalid) {
      return;
    }
  }
  onSubmitUniversity() {
    this.submittedUniversity = true;

    if (this.registrationFormGroup.invalid) {
      return;
    }
  }
}

export class RegistrationValidator {
  static validate(registrationFormGroup: FormGroup) {
    let password = registrationFormGroup.controls.password.value;
    let repeatPassword = registrationFormGroup.controls.repeatPassword.value;

    if (repeatPassword.length <= 0) {
      return null;
    }

    if (repeatPassword !== password) {
      return {
        doesMatchPassword: true
      };
    }

    return null;

  }
}