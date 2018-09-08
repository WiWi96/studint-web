import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectProfileService } from '_service/profile/project/projectProfile.service';
import { UtilsService } from '_service/utils/utils.service';
import { ProjectInfo } from '_models/info/projectInfo';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.less']
})
export class ProjectManagementComponent implements OnInit, OnDestroy {

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
    this.sub = this.projectService.getProjectsByCompany(54).subscribe(
      data => this.projects = data,
      err => this.projects = null
    )
  }

  createProject(): void {

  }

  editDetails(id: number): void {

  }

  manageTeams(id: number): void {

  }

  cancelProject(id: number): void {
    this.projectService.deleteProject(id).subscribe(() => this.getProjects());
  }
}
