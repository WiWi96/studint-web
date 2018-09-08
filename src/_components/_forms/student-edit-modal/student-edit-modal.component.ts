import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { NgbActiveModal, NgbTypeahead } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { HtmlParser, HtmlTagDefinition, IfStmt } from '../../../../node_modules/@angular/compiler';
import { UserProfileService } from '_service/profile/user/userProfile.service';
import { Technology } from '_models/technology/technology';
import { Observable, Subject, merge } from '../../../../node_modules/rxjs';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-student-edit-modal',
  templateUrl: './student-edit-modal.component.html',
  styleUrls: ['./student-edit-modal.component.less']
})
export class StudentEditModalComponent implements OnInit {

  accountStudentDetailsFormGroup: FormGroup;
  fullNameFormGroup: FormGroup;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  focus2$ = new Subject<string>();
  click2$ = new Subject<string>();

  userTechnologiesTags: string[];
  serviceTechnolgies: string[];

  userLanguagesTags: string[] = ['English', 'Polish', 'Croatian'];
  serviceLanguages: string[];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private userProfileService: UserProfileService
  ) { }

  ngOnInit() {
    this.getTechnologies();
    this.getLanguages();
    this.createStudentForm();
  }

  onSubmitStudent() {

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
    });
  }

  getTechnologies() {
    this.userProfileService.getAllTechnology().subscribe(technologies => {
      this.getAllTechnolgies(technologies);
    });

    this.userProfileService.getAllUserTechnolgies().subscribe(data => {
      this.getUserTechnolgies(data);
    });
  }

  getLanguages() {
    this.userProfileService.getAllLanguages().subscribe(languages => {
      this.serviceLanguages = languages;
    })
  }

  getAllTechnolgies(technolgies: string[]) {
    this.serviceTechnolgies = technolgies;
  }

  getUserTechnolgies(technolgies: string[]) {
    this.userTechnologiesTags = technolgies;
  }

  getAllTechnologies(languages: string[]) {
    this.serviceLanguages = languages;
  }

  public onTechnologyCloseClick(teachnologyTag: string): void {
    this.userTechnologiesTags.forEach((technology, index) => {
      if (teachnologyTag == technology) {
        this.userTechnologiesTags.splice(index, 1);
      }
    });
  }

  public onLanguageCloseClick(languageTag: string): void {
    this.userLanguagesTags.forEach((language, index) => {
      if (languageTag == language) {
        this.userLanguagesTags.splice(index, 1);
      }
    });
  }

  close() {
    this.activeModal.dismiss();
  }

  selectedTechnologyItem(technology: string) {
    if (!this.userTechnologiesTags.includes(technology))
      this.userTechnologiesTags.push(technology)
  }

  selectedLanguageItem(language: string) {
    if (!this.userLanguagesTags.includes(language))
      this.userLanguagesTags.push(language)
  }

  //search typeahead
  searchTechnolgy = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.serviceTechnolgies
        : this.serviceTechnolgies.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 4))
    );
  }

  searchLanguage = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click2$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus2$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.serviceLanguages
        : this.serviceLanguages.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 4))
    );
  }
}
