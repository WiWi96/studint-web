import { Component, OnInit } from '@angular/core';
import { ProjectProfile } from '_models/profile/projectProfile';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { NgbActiveModal, NgbRatingConfig, NgbCalendar, NgbDate } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.less'],
})
export class ProjectEditComponent implements OnInit {

  //Form Group
  projectFormGroup: FormGroup;

  projectProfile: ProjectProfile;

  currentRate = 2;

  datepickerModel: Date;
  daterangepickerModel: Date[];

  hoveredDate: NgbDate;

  fromDate: NgbDate;
  toDate: NgbDate;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    config: NgbRatingConfig,
    calendar: NgbCalendar) {
    config.max = 5;
    config.readonly = false;
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
   
 
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
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
      date: ['']
    })
  }

}
