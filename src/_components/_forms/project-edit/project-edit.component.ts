import { Component, OnInit } from '@angular/core';
import { ProjectProfile } from '_models/profile/projectProfile';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { NgbActiveModal } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.less']
})
export class ProjectEditComponent implements OnInit {

  //Form Group
  projectFormGroup: FormGroup;

  projectProfile: ProjectProfile;

  currentRate = 8;

  constructor(private formBuilder: FormBuilder,
              public activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.createProjectForm();
  }

  close() {
    this.activeModal.dismiss();
  }

  createProjectForm() {
    this.projectFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

}
