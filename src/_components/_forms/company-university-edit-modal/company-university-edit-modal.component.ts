import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from '_models/address';
import { CompanyProfile } from '_models/profile/companyProfile';
import { CompanyProfileService } from '_service/profile/company/companyProfile.service';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { UniversityProfile } from '_models/profile/universityProfile';
import { ProfileName } from '_models/profile/profileName';
import { UniversityProfileService } from '_service/profile/university/universityProfile.service';
import { DISABLED } from '@angular/forms/src/model';
import { ValueTransformer } from '@angular/compiler/src/util';
import { SocialMedia } from '_models/socialMedia';
import { ServiceType } from '_enums/serviceTypes';
import { Course } from '_models/course';
import { CoursService } from '_service/cours/cours.service';
import { TypeaheadMatch } from '../../../../node_modules/ngx-bootstrap';


@Component({
  selector: 'app-company-university-edit-modal',
  templateUrl: './company-university-edit-modal.component.html',
  styleUrls: ['./company-university-edit-modal.component.less']
})
export class CompanyUniversityEditModalComponent implements OnInit {
  address: Address;
  profileName: ProfileName;

  addressFormGroup: FormGroup;
  registrationFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  socialServicesFormpGroup: FormGroup;

  accountUniversityDetailsFormGroup: FormGroup;

  accountDetailsFormGroup: FormGroup;


  socialServices: string[];
  courses: Course[] = [];

  socialMedia: SocialMedia[];
  socialMediaMap: Map<ServiceType, string> = new Map<ServiceType, string>();

  companyProfile: CompanyProfile;
  univeristyProfile: UniversityProfile;

  countries = ['Poland', 'Germany', 'Spain', 'Czech Republic'];

  //sumbitted
  submittedCompany: boolean = false;
  submittedUniversity: boolean = false;

  //Flags 
  isCompany: boolean;
  isUniversity: boolean;

  universityCoursesTag: Course[] = [];
  tagSelected: Course;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private companyProfileService: CompanyProfileService,
    private universityProfileService: UniversityProfileService,
    public coursesService: CoursService
  ) { }

  ngOnInit() {
    this.initializeForms();
  }

  initializeForms() {
    if (this.isCompany) {
      this.address = this.companyProfile.address;
      this.profileName = this.companyProfile.profileName;
      this.getCompanySocialMedia();
      this.createCompanyForm();
    }
    else if (this.isUniversity) {
      //this.universityCoursesTag = JSON.parse(JSON.stringify(this.univeristyProfile.courses);
      this.address = this.univeristyProfile.address;
      this.profileName = this.univeristyProfile.profileName;
      this.getUniversitySocialMedia();
      this.createUniversityForm();
    }
  }

  getCompanySocialMedia() {
    this.companyProfile.profiles.forEach(social => {
      this.socialMediaMap.set(social.service, social.url);
    })
  }

  getUniversitySocialMedia() {
    this.univeristyProfile.profiles.forEach(social => {
      this.socialMediaMap.set(social.service, social.url);
    })
  }

  getCourses(){
    this.coursesService.getAllCourses().subscribe(data =>{
      this.courses = data;
    })
  }

  //University 
  createUniversityForm() {
    this.socialServicesFormpGroup = this.formBuilder.group({
      youtube: [this.socialMediaMap.get(ServiceType.YouTube)],
      facebook: [this.socialMediaMap.get(ServiceType.Facebook)],
      twitter: [this.socialMediaMap.get(ServiceType.Twitter)],
      instagram: [this.socialMediaMap.get(ServiceType.Instagram)],
      linkedin: [this.socialMediaMap.get(ServiceType.LinkedIn)],
      github: [this.socialMediaMap.get(ServiceType.GitHub)],
      pinterest: [this.socialMediaMap.get(ServiceType.Pinterest)],
      google: [this.socialMediaMap.get(ServiceType.Google)],
      custom: [this.socialMediaMap.get(ServiceType.Custom)]
    });

    this.addressFormGroup = this.formBuilder.group({
      town: [this.address.town, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      postalCode: [this.address.postCode, [Validators.required, Validators.pattern("^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]")]],
      street: [this.address.street, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ.' ]+")]],
      country: [this.address.country, [Validators.required]],
      houseNo: [this.address.houseNo, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ0-9]+")]]
    });

    this.accountDetailsFormGroup = this.formBuilder.group({
      name: [this.univeristyProfile.profileName.name, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ ]+")]],
      address: this.addressFormGroup,
      description: [this.univeristyProfile.description, [Validators.required]],
      socialServices: this.socialServicesFormpGroup,
    })
  }


  // Company 
  createCompanyForm() {

    this.socialServicesFormpGroup = this.formBuilder.group({
      youtube: [this.socialMediaMap.get(ServiceType.YouTube)],
      facebook: [this.socialMediaMap.get(ServiceType.Facebook)],
      twitter: [this.socialMediaMap.get(ServiceType.Twitter)],
      instagram: [this.socialMediaMap.get(ServiceType.Instagram)],
      linkedin: [this.socialMediaMap.get(ServiceType.LinkedIn)],
      github: [this.socialMediaMap.get(ServiceType.GitHub)],
      pinterest: [this.socialMediaMap.get(ServiceType.Pinterest)],
      google: [this.socialMediaMap.get(ServiceType.Google)],
      custom: [this.socialMediaMap.get(ServiceType.Custom)]
    });

    this.addressFormGroup = this.formBuilder.group({
      town: [this.address.town, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ ]+")]],
      postalCode: [this.address.postCode, [Validators.required, Validators.pattern("^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]")]],
      street: [this.address.street, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ'. ]+")]],
      country: [this.address.country, [Validators.required]],
      houseNo: [this.address.houseNo, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ0-9]+")]]
    });

    this.accountDetailsFormGroup = this.formBuilder.group({
      name: [this.profileName.name, [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ ]+")]],
      address: this.addressFormGroup,
      description: [this.companyProfile.description, [Validators.required]],
      socialServices: this.socialServicesFormpGroup,
     // courses: []
    })

  }

  onSubmitUniversity() {
    this.submittedUniversity = true;

    if (this.accountDetailsFormGroup.invalid)
      return;

    this.setUniversityAddressDetails();
    this.setUniversityProfileName();
    this.setUniversitySocialServices();
    this.setUniversityProfileDescription();

    this.universityProfileService.updateUniversity(this.univeristyProfile).subscribe();
    this.activeModal.close();
  }

  onSubmitCompany() {
    this.submittedCompany = true;

    if (this.accountDetailsFormGroup.invalid)
      return

    this.setCompanyAddressDetails();
    this.setCompanyProfileName();
    this.setCompanySocialServices();
    this.setCompanyProfileDescription();

    this.companyProfileService.updateCompany(this.companyProfile).subscribe();

    this.activeModal.close();
  }
  setUniversitySocialServices() {
    this.univeristyProfile.profiles = [];

    if (this.socialServicesFormpGroup.get('youtube').value)
      this.univeristyProfile.profiles.push(new SocialMedia(ServiceType.YouTube, this.socialServicesFormpGroup.get('youtube').value));
    if (this.socialServicesFormpGroup.get('facebook').value)
      this.univeristyProfile.profiles.push(new SocialMedia(ServiceType.Facebook, this.socialServicesFormpGroup.get('facebook').value));
    if (this.socialServicesFormpGroup.get('twitter').value)
      this.univeristyProfile.profiles.push(new SocialMedia(ServiceType.Twitter, this.socialServicesFormpGroup.get('twitter').value));
    if (this.socialServicesFormpGroup.get('instagram').value)
      this.univeristyProfile.profiles.push(new SocialMedia(ServiceType.Instagram, this.socialServicesFormpGroup.get('instagram').value));
    if (this.socialServicesFormpGroup.get('linkedin').value)
      this.univeristyProfile.profiles.push(new SocialMedia(ServiceType.LinkedIn, this.socialServicesFormpGroup.get('linkedin').value));
    if (this.socialServicesFormpGroup.get('github').value)
      this.univeristyProfile.profiles.push(new SocialMedia(ServiceType.GitHub, this.socialServicesFormpGroup.get('github').value));
    if (this.socialServicesFormpGroup.get('pinterest').value)
      this.univeristyProfile.profiles.push(new SocialMedia(ServiceType.Pinterest, this.socialServicesFormpGroup.get('pinterest').value));
    if (this.socialServicesFormpGroup.get('google').value)
      this.univeristyProfile.profiles.push(new SocialMedia(ServiceType.Google, this.socialServicesFormpGroup.get('google').value));
    if (this.socialServicesFormpGroup.get('custom').value)
      this.univeristyProfile.profiles.push(new SocialMedia(ServiceType.Custom, this.socialServicesFormpGroup.get('custom').value));
  }

  setUniversityProfileName() {
    this.univeristyProfile.profileName.name = this.accountDetailsFormGroup.get('name').value;
  }

  setUniversityProfileDescription() {
    this.univeristyProfile.description = this.accountDetailsFormGroup.get('description').value;
  }

  setUniversityAddressDetails() {
    this.univeristyProfile.address.town = this.addressFormGroup.get('town').value;
    this.univeristyProfile.address.postCode = this.addressFormGroup.get('postalCode').value;
    this.univeristyProfile.address.street = this.addressFormGroup.get('street').value;
    this.univeristyProfile.address.country = this.addressFormGroup.get('country').value;
    this.univeristyProfile.address.houseNo = this.addressFormGroup.get('houseNo').value;
  }

  //To fix - nie zapisuje linków po stronie servera
  setCompanySocialServices() {
    this.companyProfile.profiles = [];

    if (this.socialServicesFormpGroup.get('youtube').value)
      this.companyProfile.profiles.push(new SocialMedia(ServiceType.YouTube, this.socialServicesFormpGroup.get('youtube').value));
    if (this.socialServicesFormpGroup.get('facebook').value)
      this.companyProfile.profiles.push(new SocialMedia(ServiceType.Facebook, this.socialServicesFormpGroup.get('facebook').value));
    if (this.socialServicesFormpGroup.get('twitter').value)
      this.companyProfile.profiles.push(new SocialMedia(ServiceType.Twitter, this.socialServicesFormpGroup.get('twitter').value));
    if (this.socialServicesFormpGroup.get('instagram').value)
      this.companyProfile.profiles.push(new SocialMedia(ServiceType.Instagram, this.socialServicesFormpGroup.get('instagram').value));
    if (this.socialServicesFormpGroup.get('linkedin').value)
      this.companyProfile.profiles.push(new SocialMedia(ServiceType.LinkedIn, this.socialServicesFormpGroup.get('linkedin').value));
    if (this.socialServicesFormpGroup.get('github').value)
      this.companyProfile.profiles.push(new SocialMedia(ServiceType.GitHub, this.socialServicesFormpGroup.get('github').value));
    if (this.socialServicesFormpGroup.get('pinterest').value)
      this.companyProfile.profiles.push(new SocialMedia(ServiceType.Pinterest, this.socialServicesFormpGroup.get('pinterest').value));
    if (this.socialServicesFormpGroup.get('google').value)
      this.companyProfile.profiles.push(new SocialMedia(ServiceType.Google, this.socialServicesFormpGroup.get('google').value));
    if (this.socialServicesFormpGroup.get('custom').value)
      this.companyProfile.profiles.push(new SocialMedia(ServiceType.Custom, this.socialServicesFormpGroup.get('custom').value));
  }

  setCompanyProfileName() {
    this.companyProfile.profileName.name = this.accountDetailsFormGroup.get('name').value;
  }

  setCompanyProfileDescription() {
    this.companyProfile.description = this.accountDetailsFormGroup.get('description').value;
  }

  setCompanyAddressDetails() {
    this.companyProfile.address.town = this.addressFormGroup.get('town').value;
    this.companyProfile.address.postCode = this.addressFormGroup.get('postalCode').value;
    this.companyProfile.address.street = this.addressFormGroup.get('street').value;
    this.companyProfile.address.country = this.addressFormGroup.get('country').value;
    this.companyProfile.address.houseNo = this.addressFormGroup.get('houseNo').value;
  }


  //Utility
  close() {
    this.activeModal.close();
  }
/*
  public onCoursCloseClick(skillTag: Course): void {
    this.universityCoursesTag.forEach((skill, index) => {
      if (skillTag == skill) {
        this.universityCoursesTag.splice(index, 1);
      }
    });
  }


  onCoursSelect(e: TypeaheadMatch) {
    this.universityCoursesTag = this.skills.find(skill => {
      return skill.name == e.value;
    });
    //this.technologyFormControl.reset();

    if (this.universityCoursesTag && !this.universityCoursesTag.some(skill => { return skill.name == e.value }))
      this.universityCoursesTag.push(this.tagSelected);

  }*/

}

