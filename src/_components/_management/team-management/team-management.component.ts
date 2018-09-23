import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProjectProfileService } from '_service/profile/project/projectProfile.service';
import { ActivatedRoute } from '@angular/router';
import { ProfileName } from '_models/profile/profileName';
import { Team } from '_models/team/team';
import { UtilsService } from '_service/utils/utils.service';
import * as animals from "animals";
import { ProjectTeams } from '_models/team/projectTeams';
import { NotificationService } from '_service/notification/notification.service';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.less']
})
export class TeamManagementComponent implements OnInit, OnDestroy {

  id: number;
  project: ProjectTeams;
  private sub: any;

  unassignedParticipants: ProfileName[] = [];
  teams: Team[] = [];

  constructor(
    private projectService: ProjectProfileService,
    private route: ActivatedRoute,
    private utils: UtilsService,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.getProject(this.id);
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  getProject(id: number) {
    this.projectService.getProjectTeams(this.id).subscribe(
      data => {
        this.project = data;
        this.initTeams();
      }
    )
  }

  initTeams() {
    this.unassignedParticipants = this.project.unassigned.slice(0);
    this.teams = this.project.teams.sort(function (a: Team, b: Team) { return a.id - b.id }).slice(0);
    this.teams.forEach(team => {
      if (team.leader) {
        team.members.unshift(team.leader);
        team.leader = null;
      }
    });
    console.log(this.teams);
  }

  addTeam() {
    let team = new Team();
    let animal: string = animals();
    if (!animal.endsWith('sheep') && !animal.endsWith('fish')) {
      if (animal === 'goose') {
        animal = 'geese';
      }
      else if (animal === 'mouse') {
        animal = 'mice';
      }
      else
        animal = this.utils.getPlural(animal);
    }
    team.name = animal.charAt(0).toUpperCase() + animal.substr(1);
    this.teams.push(team);
  }

  removeTeam = (params) => {
    this.teams.splice(this.teams.indexOf(params.team), 1);
    this.unassignedParticipants = this.unassignedParticipants.concat(params.team.members);
  }

  removeUser = (params) => {
    this.unassignedParticipants = this.unassignedParticipants.filter(item => item !== params.user);
  }

  saveChanges = (params) => {
    console.log(this.teams);
    this.project.unassigned = this.unassignedParticipants.slice(0);
    this.project.teams = this.teams.slice(0);
    console.log(this.project.teams);
    this.project.teams.forEach(team => {

      team.leader = team.members.shift();
      console.log(team.members);
    });
    this.projectService.updateProjectTeams(this.project).subscribe(
      data => this.project = data,
      () => this.notificationService.notify("Could not update project teams")
    )
  }

  discardChanges = () => {
    this.getProject(this.id);
  }

}
