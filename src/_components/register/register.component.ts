// ts-ignore
import { NgModule, Component, OnInit, ViewChild } from "@angular/core";
import { FormsModule, FormGroup, FormBuilder, Validators, FormControl, FormGroupDirective } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { MainPageService } from "_service/mainpage/mainpage.service";


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
  fullNameFormGroup: FormGroup;



  accountStudentDetailsFormGroup: FormGroup;
  accountUniversityDetailsFormGroup: FormGroup;
  accountCompanyDetailsFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private mainPageService: MainPageService
  ) { }

  ngOnInit() {
    this.createStudentForm();
    this.createUniversityForm();
    this.createCompanyForm();
    this.getAllProfileNames();
  }

  get f() { return this.accountStudentDetailsFormGroup.controls; }
  get f2() { return this.accountUniversityDetailsFormGroup.controls; }
  get f3() { return this.accountCompanyDetailsFormGroup.controls; }

  //student Form
  createStudentForm() {
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

    this.fullNameFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      surname: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]]
    })

    this.accountStudentDetailsFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
      password: this.passwordFormGroup,
      fullname: this.fullNameFormGroup,
      checkbox: ['', [Validators.required]]
    });
  }

  //university Form
  createUniversityForm() {
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

    this.fullNameFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      surname: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]]
    });

    this.addressFormGroup = this.formBuilder.group({
      town: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      postalCode: ['', [Validators.required, Validators.pattern("^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]")]],
      street: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      country: ['', [Validators.required]],
      houseNo: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ0-9]+")]]
    });

    this.accountUniversityDetailsFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
      password: this.passwordFormGroup,
      universityName: ['', [Validators.required]],
      address: this.addressFormGroup,
      checkbox: ['', [Validators.required]]
    });
  }

  createCompanyForm() {

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

    this.fullNameFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      surname: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]]
    });

    this.addressFormGroup = this.formBuilder.group({
      town: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      postalCode: ['', [Validators.required, Validators.pattern("^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]")]],
      street: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      country: ['', [Validators.required]],
      houseNo: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ0-9]+")]]
    });


    this.accountCompanyDetailsFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
      password: this.passwordFormGroup,
      companyName: ['', [Validators.required]],
      address: this.addressFormGroup,
      checkbox: ['', [Validators.required]]
    });
  }


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

  //endpoints
  getAllProfileNames() {

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