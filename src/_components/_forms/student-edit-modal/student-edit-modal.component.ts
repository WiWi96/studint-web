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
import { TypeaheadMatch } from '../../../../node_modules/ngx-bootstrap';
import { Skill } from '_models/skill/skill';
import { SkillService } from '_service/skill/skill.service';

@Component({
  selector: 'app-student-edit-modal',
  templateUrl: './student-edit-modal.component.html',
  styleUrls: ['./student-edit-modal.component.less']
})
export class StudentEditModalComponent implements OnInit {

  accountStudentDetailsFormGroup: FormGroup;
  fullNameFormGroup: FormGroup;

  languageSelected: Language;
  skillSelected: Skill;

  userSkillTags: Skill[];
  serviceTechnolgies: string[];


  userLanguagesTags: Language[];

  languages: Language[];
  skills: Skill[];

  user: UserProfile;
  customSelected: string;

  languageFormControl = new FormControl();
  technologyFormControl = new FormControl();

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private userProfileService: UserProfileService,
    private languageService: LanguageService,
    private skillService: SkillService
  ) { }

  ngOnInit() {
    this.userLanguagesTags = this.user.languages;
    this.userSkillTags = this.user.skills;
    this.getLanguages();
    this.getTechnologies();
    this.createStudentForm();

  }

  onSubmitStudent() {

  }

  close() {
    this.activeModal.dismiss();
  }

  createStudentForm() {
    this.createFullNameFormGroup();
    this.createAccountDetailsFormGroup();
  }

  createFullNameFormGroup() {
    this.fullNameFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      surname: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]]
    })
  }

  createAccountDetailsFormGroup() {
    this.accountStudentDetailsFormGroup = this.formBuilder.group({
      fullname: this.fullNameFormGroup,
      language: this.languageFormControl,
      technology: this.technologyFormControl
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
    this.skillSelected = this.skills.find(value => {
      return value.name == e.value;
    });

    if (this.skillSelected && !this.userSkillTags.some(skill => { return skill.name == e.value }))
      this.userSkillTags.push(this.skillSelected);
  }

  onLanguageSelect(e: TypeaheadMatch): void {
    this.languageSelected = this.languages.find(value => {
      return value.name == e.value;
    });

    if (this.languageSelected && !this.userLanguagesTags.some(language => { return language.name == e.value }))
      this.userLanguagesTags.push(this.languageSelected);
  }
}
