import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';
import { NgbActiveModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { HtmlParser, HtmlTagDefinition } from '../../../../node_modules/@angular/compiler';

@Component({
  selector: 'app-student-edit-modal',
  templateUrl: './student-edit-modal.component.html',
  styleUrls: ['./student-edit-modal.component.less']
})
export class StudentEditModalComponent implements OnInit {

  accountStudentDetailsFormGroup: FormGroup;
  fullNameFormGroup: FormGroup;

  technologiesTags = ["HTML", "CSS", "SPRING", 'SPRING2', 'C++', 'C', 'ANGULAR', 'REACT.JS', 'C#'];
  public showNotification: boolean[] = [true, true, true, true];
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
  ) {
    //this.showNotification = true;
  }

  tagsHtml: string = '<button>The Tortoise</button> ';
  ngOnInit() {

    this.fullNameFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      surname: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]]
    })

    this.accountStudentDetailsFormGroup = this.formBuilder.group({
      fullname: this.fullNameFormGroup,
    });
  }

  public onCloseClick(index: number): void {
    //this.showNotification = false;
    console.log(index);
    this.technologiesTags.splice(index, 1);
  }
  close() {
    this.activeModal.dismiss();
  }

  onSubmitStudent() {

  }

  createStudentForm() {

  }
}
