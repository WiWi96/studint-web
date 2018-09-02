import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '../../../../node_modules/@angular/forms';

@Component({
  selector: 'app-student-edit-modal',
  templateUrl: './student-edit-modal.component.html',
  styleUrls: ['./student-edit-modal.component.less']
})
export class StudentEditModalComponent implements OnInit {

  accountStudentDetailsFormGroup: FormGroup;
  fullNameFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.fullNameFormGroup = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]],
      surname: ['', [Validators.required, Validators.pattern("[A-Za-zÀ-ÿ]+")]]
    })
  }


  createStudentForm() {
    this.accountStudentDetailsFormGroup = this.formBuilder.group({
      fullname: this.fullNameFormGroup,
    });
  }
}
