import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-student-edit-modal',
  templateUrl: './student-edit-modal.component.html',
  styleUrls: ['./student-edit-modal.component.less']
})
export class StudentEditModalComponent implements OnInit {

  accountStudentDetailsFormGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  createStudentForm() {
    /*this.accountStudentDetailsFormGroup = this.formBuilder.group({
      fullname: this.fullNameFormGroup,
    });*/
  }
}
