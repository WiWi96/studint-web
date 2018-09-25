import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { HtmlParser, HtmlTagDefinition, IfStmt } from '@angular/compiler';
import { UserProfileService } from '_service/profile/user/userProfile.service';
import { Technology } from '_models/technology/technology';
import { Observable, Subject, merge } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Language } from '_models/skill/language';
import { UserProfile } from '_models/profile/userProfile';
import { LanguageService } from '_service/language/language.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { Skill } from '_models/skill/skill';
import { SkillService } from '_service/skill/skill.service';
import { ServiceType } from '_enums/serviceTypes';
import { SocialMedia } from '_models/socialMedia';
import { ProfileService } from '_service/profile/profile.service';

@Component({
  selector: 'app-student-edit-modal',
  templateUrl: './student-edit-modal.component.html',
  styleUrls: ['./student-edit-modal.component.less']
})
export class StudentEditModalComponent implements OnInit {

  //Form Groups
  accountStudentDetailsFormGroup: FormGroup;
  fullNameFormGroup: FormGroup;
  //Form Controllers
  languageFormControl = new FormControl();
  technologyFormControl = new FormControl();
  //Selected items
  languageSelected: Language;
  skillSelected: Skill;
  //Student skills and languages
  userSkillTags: Skill[];
  userLanguagesTags: Language[];
  //All Languages and Skills
  languages: Language[];
  skills: Skill[];
  // submitted student
  submittedStudent: boolean = false;
  //social Services
  socialServices: string[];
  socialServicesFormpGroup: FormGroup;

  user: UserProfile;
  socialMediaMap: Map<ServiceType, string> = new Map<ServiceType, string>();

  file: File;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private userProfileService: UserProfileService,
    private languageService: LanguageService,
    private skillService: SkillService,
    public profileService: ProfileService
  ) {

  }

  ngOnInit() {
    this.userLanguagesTags = JSON.parse(JSON.stringify(this.user.languages));
    this.userSkillTags = JSON.parse(JSON.stringify(this.user.skills));
    this.getLanguages();
    this.getTechnologies();
    this.getStudentSocialMedia();
    this.createStudentForm();
  }

  onSubmitStudent() {
    this.submittedStudent = true;

    if (this.accountStudentDetailsFormGroup.invalid)
      return;

    this.user.description = this.accountStudentDetailsFormGroup.get('description').value; // Add 1
    this.user.profileName.name = this.fullNameFormGroup.get('firstName').value + " " + this.fullNameFormGroup.get('surname').value;
  
    this.user.skills = this.userSkillTags;
    this.user.languages = this.userLanguagesTags ;
    this.setStudentSocialServices();
    this.userProfileService.updateUser(this.user).subscribe();
    this.activeModal.dismiss();
  }

  onFileSelected(event) {
    /*this.photoSelected = <File>event.target.files[0];
    this.profileService.uploadPhoto(this.photoSelected).subscribe(
      photoString => this.user.profileName.photo = photoString
    );*/
  }

  fileChange(event: any) {
    // Instantiate an object to read the file content
    let reader = new FileReader();
    // when the load event is fired and the file not empty
    if (event.target.files && event.target.files.length > 0) {
      // Fill file variable with the file content
      this.file = event.target.files[0];
    }
  }

  onSubmitPhoto() {
    debugger;
    // Instantiate a FormData to store form fields and encode the file
    let body = new FormData();
    // Add file content to prepare the request
    body.append("file", this.file);
    // Launch post request
    this.profileService.uploadPhoto(body).subscribe(
      // Admire results
      (data) => { console.log(data) },
      // Or errors :-(
      error => console.log(error),
      // tell us if it's finished
      () => { console.log("completed") }
    );
  }

  close() {
    this.userProfileService.updateUser(this.user).subscribe();
    this.activeModal.dismiss();
  }

  createStudentForm() {
    this.createFullNameFormGroup();
    this.createAccountDetailsFormGroup();
  }

  createFullNameFormGroup() {
    var totalWords = this.user.profileName.name;
    var totalWord2 = this.user.profileName.name;

    var firstWord = totalWords.replace(/ .*/,'');
    var secondWord = totalWord2.replace(/(([\.\?\!]|^)\s*\b\w+)/gm,"$2");
    secondWord = secondWord.replace(/^[ ]+|[ ]+$/g,'')


    this.fullNameFormGroup = this.formBuilder.group({
      firstName: [firstWord, [Validators.required, Validators.pattern("[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż ]+")]],
      surname: [secondWord, [Validators.required, Validators.pattern("[AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż ]+")]]
    })
  }

  createAccountDetailsFormGroup() {
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

    this.accountStudentDetailsFormGroup = this.formBuilder.group({
      fullname: this.fullNameFormGroup,
      language: this.languageFormControl,
      technology: this.technologyFormControl,
      description: [this.user.description],
      socialServices: this.socialServicesFormpGroup,
      file_upload: null
    });
  }

  getTechnologies() {
    this.skillService.getAllSkills().subscribe(skills => {
      this.skills = skills;
    });
  }

  getLanguages() {
    this.languageService.getAllLanguages().subscribe(languages => {
      this.languages = languages;
    })
  }

  getStudentSocialMedia() {
    this.user.profiles.forEach(social => {
      this.socialMediaMap.set(social.service, social.url);
    })
  }

  setStudentSocialServices() {
    this.user.profiles = [];

    if (this.socialServicesFormpGroup.get('youtube').value)
      this.user.profiles.push(new SocialMedia(ServiceType.YouTube, this.socialServicesFormpGroup.get('youtube').value));
    if (this.socialServicesFormpGroup.get('facebook').value)
      this.user.profiles.push(new SocialMedia(ServiceType.Facebook, this.socialServicesFormpGroup.get('facebook').value));
    if (this.socialServicesFormpGroup.get('twitter').value)
      this.user.profiles.push(new SocialMedia(ServiceType.Twitter, this.socialServicesFormpGroup.get('twitter').value));
    if (this.socialServicesFormpGroup.get('instagram').value)
      this.user.profiles.push(new SocialMedia(ServiceType.Instagram, this.socialServicesFormpGroup.get('instagram').value));
    if (this.socialServicesFormpGroup.get('linkedin').value)
      this.user.profiles.push(new SocialMedia(ServiceType.LinkedIn, this.socialServicesFormpGroup.get('linkedin').value));
    if (this.socialServicesFormpGroup.get('github').value)
      this.user.profiles.push(new SocialMedia(ServiceType.GitHub, this.socialServicesFormpGroup.get('github').value));
    if (this.socialServicesFormpGroup.get('pinterest').value)
      this.user.profiles.push(new SocialMedia(ServiceType.Pinterest, this.socialServicesFormpGroup.get('pinterest').value));
    if (this.socialServicesFormpGroup.get('google').value)
      this.user.profiles.push(new SocialMedia(ServiceType.Google, this.socialServicesFormpGroup.get('google').value));
    if (this.socialServicesFormpGroup.get('custom').value)
      this.user.profiles.push(new SocialMedia(ServiceType.Custom, this.socialServicesFormpGroup.get('custom').value));
  }


  public onTechnologyCloseClick(skillTag: Skill): void {
    this.userSkillTags.forEach((skill, index) => {
      if (skillTag == skill) {
        this.userSkillTags.splice(index, 1);
      }
    });
  }

  public onLanguageCloseClick(languageTag: Language): void {
    this.userLanguagesTags.forEach((language, index) => {
      if (languageTag == language) {
        this.userLanguagesTags.splice(index, 1);
      }
    });
  }

  onSkillSelect(e: TypeaheadMatch) {
    this.skillSelected = this.skills.find(skill => {
      return skill.name == e.value;
    });
    this.technologyFormControl.reset();

    if (this.skillSelected && !this.userSkillTags.some(skill => { return skill.name == e.value }))
      this.userSkillTags.push(this.skillSelected);

  }

  onLanguageSelect(e: TypeaheadMatch): void {
    this.languageSelected = this.languages.find(language => {
      return language.name == e.value;
    });
    this.languageFormControl.reset();

    if (this.languageSelected && !this.userLanguagesTags.some(language => { return language.name == e.value }))
      this.userLanguagesTags.push(this.languageSelected);
  }
}
