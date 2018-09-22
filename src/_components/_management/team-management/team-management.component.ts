import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ProjectProfileService } from '_service/profile/project/projectProfile.service';
import { ProjectProfile } from '_models/profile/projectProfile';
import { ActivatedRoute } from '@angular/router';
import { ProfileName } from '_models/profile/profileName';
import { Team } from '_models/team/team';
import { UtilsService } from '_service/utils/utils.service';

@Component({
  selector: 'app-team-management',
  templateUrl: './team-management.component.html',
  styleUrls: ['./team-management.component.less']
})
export class TeamManagementComponent implements OnInit, OnDestroy {

  @Input() id: number;
  project: ProjectProfile;
  private sub: any;

  unassignedParticipants: ProfileName[] = [];
  teams: Team[] = [];

  constructor(
    private projectService: ProjectProfileService,
    private route: ActivatedRoute,
    private utils: UtilsService
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
    this.projectService.getProject(this.id).subscribe(
      data => {
        this.project = data;
        this.initTeams();
      }
    )
  }

  initTeams() {
    this.unassignedParticipants = this.project.participants;
    this.teams = this.project.teams.sort(function (a: Team, b: Team) { return a.id - b.id });
    this.teams.forEach(team => {
      if (team.leader && team.members.includes(team.leader)) {
        team.members = team.members.filter(member => member !== team.leader);
        team.members.unshift(team.leader);
      }
    });
  }

  addTeam() {
    let team = new Team();
    team.name = 'Unnamed team';
    this.teams.push(team);
  }

  removeTeam = (params) => {
    this.teams.splice(this.teams.indexOf(params.team), 1);
    this.unassignedParticipants = this.unassignedParticipants.concat(params.team.members);
  }

  removeUser = (params) => {

  }

}
