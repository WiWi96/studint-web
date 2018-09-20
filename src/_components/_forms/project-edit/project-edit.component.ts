import { Component, OnInit } from '@angular/core';
import { ProjectProfile } from '_models/profile/projectProfile';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { NgbActiveModal, NgbRatingConfig, NgbCalendar, NgbDate } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Skill } from '_models/skill/skill';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.less'],
})
export class ProjectEditComponent implements OnInit {

  //Form Group
  projectFormGroup: FormGroup;

  projectProfile: ProjectProfile;

  userSkillTags: Skill[];

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    config: NgbRatingConfig,
    calendar: NgbCalendar) {
   
 
  }


  ngOnInit() {
    BsDatepickerModule.forRoot()
    this.createProjectForm();
  }

  close() {
    this.activeModal.dismiss();
  }

  createProjectForm() {
    this.projectFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startDate: [''],
      endDate: [''],
      technology: ['']
    })
  }

}
