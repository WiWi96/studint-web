import { Component, OnInit } from '@angular/core';
import { ProjectProfile } from '_models/profile/projectProfile';
import { FormBuilder, FormGroup, Validators, FormControl } from '../../../../node_modules/@angular/forms';
import { NgbActiveModal, NgbRatingConfig, NgbCalendar, NgbDate, NgbDatepickerConfig, NgbDatepicker, NgbInputDatepicker } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Skill } from '_models/skill/skill';
import { SkillService } from '_service/skill/skill.service';
import { TypeaheadMatch, Utils } from '../../../../node_modules/ngx-bootstrap';
import { ProfileName } from '_models/profile/profileName';
import { UtilsService } from '_service/utils/utils.service';
import { ProjectProfileService } from '_service/profile/project/projectProfile.service';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.less'],

})
export class ProjectEditComponent implements OnInit {

  //Project profile
  projectProfile: ProjectProfile;
  //Form Group
  projectFormGroup: FormGroup;
  //Skills
  projectSkillTags: Skill[];
  skills: Skill[];
  skillSelected: Skill;
  //Form Controllers
  technologyFormControl = new FormControl();
  model = { year: 2017, month: 8, day: 8 };
  model2 = { year: 2017, month: 8, day: 8 };
  //Rating 
  currentRate = 2;
  //Validation submitted
  submittedProject: boolean = false;

  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private config: NgbRatingConfig,
    private calendar: NgbCalendar,
    private projectService: ProjectProfileService,
    private skillService: SkillService,
    private utils: UtilsService, ) {
    this.config.max = 5;
    this.config.readonly = false;

  }

  ngOnInit() {
    this.createProjectForm();
    this.getTechnologies();
    this.configDifficult();
    this.configDifficult();
    this.projectSkillTags = this.projectProfile.technologies;

  }

  getTechnologies() {
    this.skillService.getAllSkills().subscribe(skills => {
      this.skills = skills;
    });
  }

  onSubmitProject() {
    this.submittedProject = true;

    if (this.projectFormGroup.invalid) {
      return;
    }

    this.activeModal.dismiss();
    this.projectProfile.level = this.utils.getProjectStatusCase(this.currentRate)
    this.projectService.updateProject(this.projectProfile);
  }

  configDifficult() {
    this.currentRate = this.utils.getProjectDifficultyNumber(this.projectProfile.level);
  }

  close() {
    this.activeModal.dismiss();
  }

  createProjectForm() {
    this.projectFormGroup = this.formBuilder.group({
      name: [this.projectProfile.name, [Validators.required]],
      description: [this.projectProfile.description],
      startDate: [''],
      endofEntries: [this.projectProfile.joiningDate],
      technology: this.technologyFormControl,
    })
  }

  onSkillSelect(e: TypeaheadMatch) {
    this.skillSelected = this.skills.find(skill => {
      return skill.name == e.value;
    });
    this.technologyFormControl.reset();

    if (this.skillSelected && !this.projectSkillTags.some(skill => { return skill.name == e.value }))
      this.projectSkillTags.push(this.skillSelected);
  }

}
