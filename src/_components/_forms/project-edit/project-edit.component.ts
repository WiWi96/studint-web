import { Component, OnInit } from '@angular/core';
import { ProjectProfile } from '_models/profile/projectProfile';
import { FormBuilder, FormGroup, Validators, FormControl } from '../../../../node_modules/@angular/forms';
import { NgbActiveModal, NgbRatingConfig, NgbCalendar, NgbDate } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Skill } from '_models/skill/skill';
import { SkillService } from '_service/skill/skill.service';
import { TypeaheadMatch, Utils } from '../../../../node_modules/ngx-bootstrap';
import { ProfileName } from '_models/profile/profileName';
import { UtilsService } from '_service/utils/utils.service';

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

  projectSkillTags: Skill[];
  skills: Skill[];
  skillSelected: Skill;
  projectProfileName: ProfileName;
  //Form Controllers
  technologyFormControl = new FormControl();


  constructor(private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal,
    private config: NgbRatingConfig,
    calendar: NgbCalendar,
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
    console.log(this.projectProfile);



  }

  getTechnologies() {
    this.skillService.getAllSkills().subscribe(skills => {
      this.skills = skills;
    });
  }

  onSubmitProject() {
    this.activeModal.dismiss();
    this.projectProfile.level = this.utils.getProjectStatusCase(this.currentRate)
    console.log(this.projectProfile.level);
  }


  configDifficult() {
    this.currentRate = this.utils.getProjectDifficultyNumber(this.projectProfile.level);
  }

  close() {
    this.activeModal.dismiss();
  }

  toggleStar() {
    this.projectProfile.level = this.utils.getProjectLevelText(this.currentRate.toString());
  }

  createProjectForm() {

    this.projectFormGroup = this.formBuilder.group({
      name: [this.projectProfile.name, [Validators.required]],
      description: ['', [Validators.required]],
      startDate: [''],
      endDate: [''],
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
