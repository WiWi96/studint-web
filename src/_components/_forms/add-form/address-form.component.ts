import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from '_models/address';


@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.less']
})
export class AddressFormComponent implements OnInit {

  submittedStudent: boolean = false;
  submittedUniversity: boolean = false;
  submittedCompany: boolean = false;

  addressFormGroup: FormGroup;
  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  fullNameFormGroup: FormGroup;

  accountStudentDetailsFormGroup: FormGroup;
  accountUniversityDetailsFormGroup: FormGroup;
  accountCompanyDetailsFormGroup: FormGroup;

  addressCompany: Address;

  countries = ['Poland', 'Germany', 'Spain']

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.createCompanyForm();
  }

  get f() { return this.accountStudentDetailsFormGroup.controls; }
  get f2() { return this.accountUniversityDetailsFormGroup.controls; }
  get f3() { return this.accountCompanyDetailsFormGroup.controls; }

  close() {
    this.activeModal.close();
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
      town: [this.addressCompany.town, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      postalCode: [this.addressCompany.postCode, [Validators.required, Validators.pattern("^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]")]],
      street: [this.addressCompany.street, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      country: [this.addressCompany.country, [Validators.required]],
      houseNo: [this.addressCompany.houseNo, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ0-9]+")]]
    });


    this.accountCompanyDetailsFormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
      password: this.passwordFormGroup,
      companyName: ['', [Validators.required]],
      address: this.addressFormGroup,
      checkbox: ['', [Validators.required]]
    });
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