// ts-ignore
import { NgModule, Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";


@Component({
  selector: 'app-login',
  templateUrl: 'register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  countries = ["Poland", "France", "Japan", "Great Britain", "Germany", "Italy", 'Ondraszek'];

  submittedStudent: boolean = false;
  submittedUniversity: boolean = false;
  submittedCompany: boolean = false;

  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  addressFormGroup: FormGroup;
  othersFormGroup: FormGroup;
  firstNameSurnameFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.passwordFormGroup = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeatPassword: ['', Validators.required]
    }, {
        validator: RegistrationValidator.validate.bind(this)
      });

    this.registrationFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
      passwordFormGroup: this.passwordFormGroup.get('password')
    });

    this.addressFormGroup = this.formBuilder.group({
      town: ['', [Validators.required, Validators.pattern("[a-zA-z]+")]],
      postCode: ['', [Validators.required, Validators.pattern("^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]")]],
      street: ['', [Validators.required, Validators.pattern("[a-zA-z]+")]],
      country: ['', [Validators.required]],
      houseNo: ['', [Validators.required, Validators.pattern("[a-zA-z0-9]+")]]
    })

    this.othersFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      checkbox: ['', [Validators.required]]
    })
    
    this.firstNameSurnameFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("[a-zA-z]+")]],
      surname: ['', [Validators.required, Validators.pattern("[a-zA-z]+")]]
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

  onSubmitCompany() {
    this.submittedCompany = true;

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