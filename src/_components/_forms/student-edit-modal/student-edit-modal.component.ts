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

  userTechnologiesTags: string[];
  serviceTechnolgies: string[];

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private userProfileService: UserProfileService
  ) { }

  ngOnInit() {
    this.getTechnologies();
    this.createStudentForm();
  }

  onSubmitStudent() {

  }

  createStudentForm() {
    this.fullNameFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      surname: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]]
    })

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

  getAllTechnolgies(technolgies: string[]) {
    this.serviceTechnolgies = technolgies;
  }

  getUserTechnolgies(technolgies: string[]) {
    this.userTechnologiesTags = technolgies;
  }

  public onCloseClick(item: string): void {
    console.log(item);

    this.userTechnologiesTags.forEach((data, index) => {
      if (data == item) {
        this.userTechnologiesTags.splice(index, 1);
      }
    });
  }

  close() {
    this.activeModal.dismiss();
  }

  selectedItem(item: string) {
    if (!this.userTechnologiesTags.includes(item))
      this.userTechnologiesTags.push(item)
  }

  searchTechnolgy = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));

    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(


      map(term => (term === '' ? this.serviceTechnolgies
        : this.serviceTechnolgies.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }
}
