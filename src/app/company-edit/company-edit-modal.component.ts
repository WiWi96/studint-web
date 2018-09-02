import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from '_models/address';
import { CompanyProfile } from '_models/profile/companyProfile';
import { CompanyProfileService } from '_service/profile/company/companyProfile.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:3000/api/upload';

@Component({
  selector: 'app-company-edit-modal',
  templateUrl: './company-edit-modal.component.html',
  styleUrls: ['./acompany-edit-modal.component.less']
})
export class CompanyEditModalComponent implements OnInit {

  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'photo' });

  addressCompany: Address;

  submittedStudent: boolean = false;
  submittedUniversity: boolean = false;
  submittedCompany: boolean = false;

  addressFormGroup: FormGroup;
  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  fullNameFormGroup: FormGroup;
  socialServicesFormpGroup: FormGroup;

  accountStudentDetailsFormGroup: FormGroup;
  accountUniversityDetailsFormGroup: FormGroup;
  accountCompanyDetailsFormGroup: FormGroup;


  socialServices: string[];

  companyProfile: CompanyProfile;
  email: string;
  file: string;
  fileToUpload: File = null;

  countries = ['Poland', 'Germany', 'Spain']

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    public companyProfileService: CompanyProfileService
  ) { }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log('ImageUpload:uploaded:', item, status, response);
      alert('File uploaded successfully');
    };

    this.addressCompany = this.companyProfile.address;
    this.createCompanyForm();
  }

  get f() { return this.accountStudentDetailsFormGroup.controls; }
  get f2() { return this.accountUniversityDetailsFormGroup.controls; }
  get f3() { return this.accountCompanyDetailsFormGroup.controls; }

  close() {

    this.activeModal.close();
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  createCompanyForm() {
    this.socialServicesFormpGroup = this.formBuilder.group({
      github: [this.socialServices[0], Validators.required],
      twitter: [this.socialServices[1], Validators.required],
      facebook: [this.socialServices[2], Validators.required],
    });

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
      companyName: [this.companyProfile.profileName.name, [Validators.required]],
      address: this.addressFormGroup,
      socialServices: this.socialServicesFormpGroup,
      description: [this.companyProfile.description, [Validators.required]],
    })

  }

  onSubmitCompany() {
    this.setAddressDetails();
    this.setCompanyName();
    this.setSocialServices();
    this.setCompanyDescription();
    this.companyProfileService.updateCompany(this.companyProfile).subscribe();
    this.activeModal.close();
  }

  setSocialServices() {
    this.socialServices[0] = this.socialServicesFormpGroup.get('github').value;
    this.socialServices[1] = this.socialServicesFormpGroup.get('twitter').value;
    this.socialServices[2] = this.socialServicesFormpGroup.get('facebook').value;
  }

  setCompanyName() {
    this.companyProfile.profileName.name = this.accountCompanyDetailsFormGroup.get('companyName').value;
  }

  setCompanyDescription() {
    this.companyProfile.description = this.accountCompanyDetailsFormGroup.get('description').value;
  }

  setAddressDetails() {
    this.addressCompany.town = this.addressFormGroup.get('town').value;
    this.addressCompany.postCode = this.addressFormGroup.get('postalCode').value;
    this.addressCompany.street = this.addressFormGroup.get('street').value;
    this.addressCompany.country = this.addressFormGroup.get('country').value;
    this.addressCompany.houseNo = this.addressFormGroup.get('houseNo').value;
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