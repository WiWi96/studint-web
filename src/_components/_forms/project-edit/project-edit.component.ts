import { Component, OnInit } from '@angular/core';
import { ProjectProfile } from '_models/profile/projectProfile';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbRatingConfig, NgbCalendar, NgbDate, NgbDatepickerConfig, NgbDatepicker, NgbInputDatepicker, NgbDateStruct, NgbDateParserFormatter, NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { Skill } from '_models/skill/skill';
import { SkillService } from '_service/skill/skill.service';
import { TypeaheadMatch, Utils } from 'ngx-bootstrap';
import { ProfileName } from '_models/profile/profileName';
import { UtilsService } from '_service/utils/utils.service';
import { ProjectProfileService } from '_service/profile/project/projectProfile.service';
import { debug } from 'util';
import { format } from 'url';
import { parse } from 'querystring';
import { runInThisContext } from 'vm';

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
  projectSkillTags: Skill[] = [];
  skills: Skill[];
  skillSelected: Skill;
  //Form Controllers
  technologyFormControl = new FormControl();
  startDate: NgbDateStruct;
  endOfEntries: NgbDateStruct;
  //Rating 
  currentRate = 1;
  difficultRate;
  //Validation submitted
  submittedProject: boolean = false;
  //title
  title: string;

  formater: NgbDateParserFormatter;
  isCreatedProject: boolean = false;

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
    this.title = this.isCreatedProject ? "PROJECT CREATOR" : "PROJECT PROFILE"

    if (this.isCreatedProject) {
      this.createManagementProjectForm();
      this.projectProfile = new ProjectProfile();
      this.getTechnologies();
    } else {

      this.createProjectForm();
      this.getTechnologies();
      this.configDifficult();
      this.initializeDate();
      this.projectSkillTags = JSON.parse(JSON.stringify(this.projectProfile.technologies));
    }

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
    this.projectProfile.technologies = this.projectSkillTags;
    this.projectProfile.description = this.projectFormGroup.get('description').value;
    this.projectProfile.name = this.projectFormGroup.get('name').value;
    this.updateDate();

    this.isCreatedProject ? this.projectService.createProject(this.projectProfile).subscribe() : this.projectService.updateProject(this.projectProfile).subscribe();
      
    
  }


  //Create Project


  // Update Project
  updateDate() {
    this.projectProfile.startDate = this.toModel(this.startDate);
    this.projectProfile.joiningDate = this.toModel(this.endOfEntries);
  }

  initializeDate() {
    this.startDate = this.fromModel(this.projectProfile.startDate);
    this.endOfEntries = this.fromModel(this.projectProfile.joiningDate);
  }


  configDifficult() {
    this.currentRate = this.utils.getProjectDifficultyNumber(this.projectProfile.level);
  }

  close() {
    this.activeModal.dismiss();
  }

  public onTechnologyCloseClick(skillTag: Skill): void {
    this.projectSkillTags.forEach((skill, index) => {
      if (skillTag == skill) {
        this.projectSkillTags.splice(index, 1);
      }
    });
  }

  // Formgroup creator
  createProjectForm() {
    this.projectFormGroup = this.formBuilder.group({
      name: [this.projectProfile.name, [Validators.required]],
      description: [this.projectProfile.description],
      startDate: [this.projectProfile.startDate],
      endofEntries: [this.projectProfile.joiningDate],
      technology: this.technologyFormControl,
    })
  }

  createManagementProjectForm() {
    this.projectFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      startDate: [''],
      endofEntries: [''],
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

  //Date utilities
  fromModel(date: Date): NgbDateStruct {

    var dateStart = new Date(date);
    return date ? {
      year: dateStart.getUTCFullYear(),
      month: dateStart.getUTCMonth() + 1,
      day: dateStart.getUTCDate()
    } : null;
  }

  toModel(date: NgbDateStruct): Date {
    return date ? new Date(Date.UTC(date.year, date.month - 1, date.day, 0, 0, 0)) : null;
  }

}
