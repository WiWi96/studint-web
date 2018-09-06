import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectProfileService } from '_service/profile/project/projectProfile.service';
import { ProfileName } from '_models/profile/profileName';
import { ProjectProfile } from '_models/profile/projectProfile';

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.less']
})
export class ProjectManagementComponent implements OnInit, OnDestroy {

  projects: Array<ProjectProfile>;
  sub: any;

  constructor(private projectService: ProjectProfileService) { }

  ngOnInit() {
    this.getProjects();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getProjects(): void {
    this.sub = this.projectService.getAllProjects().subscribe(
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
    this.projectService.deleteProject(id);
  }
}
