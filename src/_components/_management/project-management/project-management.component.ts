import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { ProjectProfileService } from '_service/profile/project/projectProfile.service';
import { UtilsService } from '_service/utils/utils.service';
import { ProjectInfo } from '_models/info/projectInfo';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ConfirmModalComponent } from '../../_forms/confirm-modal/confirm-modal.component';
import { ProjectProfile } from '_models/profile/projectProfile';
import { ProjectStatus } from '_enums/projectStatus';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.less']
})
export class ProjectManagementComponent implements OnInit, OnDestroy {
  ProjectStatus = ProjectStatus;
  projects: Array<ProjectInfo>;
  sub: any;
  modalRef: BsModalRef;

  constructor(
    private projectService: ProjectProfileService,
    private utils: UtilsService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.getProjects();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getProjects(): void {
    this.sub = this.projectService.getProjectsByCompany(54).subscribe(
      data => this.projects = data,
      err => this.projects = null
    )
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  openConfirmModal(message: string, confirmAction: Function, params: object) {
    const initialState = {
      message: message
    };
    this.modalRef = this.modalService.show(ConfirmModalComponent, { initialState });
    this.modalRef.content.onClose.subscribe((confirmed) => {
      if (confirmed) {
        confirmAction(params);
      }
    });
  }

  createProject(): void {

  }

  editDetails(id: number): void {

  }

  manageTeams(id: number): void {

  }

  finishProject = (params) => {
    let project = new ProjectProfile();
    project.profileName = {id: params.id};
    this.projectService.updateProject(project).subscribe(() => this.getProjects());
    this.modalRef.hide();
  }

  cancelProject = (params) => {
    this.projectService.deleteProject(params.id).subscribe(() => this.getProjects());
    this.modalRef.hide();
  }
}
