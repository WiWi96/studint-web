import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { ProjectProfileService } from '_service/profile/project/projectProfile.service';
import { UtilsService } from '_service/utils/utils.service';
import { ProjectInfo } from '_models/info/projectInfo';
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

    constructor(
        private projectService: ProjectProfileService,
        private utils: UtilsService) { }

    ngOnInit() {
        this.getProjects();
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    getProjects(): void {
        this.sub = this.projectService.getProjectsByCompany().subscribe(
            data => this.projects = data
        )
    }

    updateStatus(id: number, status: ProjectStatus) {
      let project = { id: id, status: status };
      this.projectService.updateProject(project).subscribe(() => this.getProjects());
    }

    createProject(): void {

    }

    editDetails(id: number): void {

    }

    publishProject = (params) => {
      this.updateStatus(params.id, ProjectStatus.Invite);
    }

    finishProject = (params) => {
      this.updateStatus(params.id, ProjectStatus.Finished);
    }

    cancelProject = (params) => {
        this.projectService.deleteProject(params.id).subscribe(() => this.getProjects());
    }
}
