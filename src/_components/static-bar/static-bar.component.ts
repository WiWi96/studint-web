import { Component, OnInit } from '@angular/core';
import { ProfileName } from '_models/profile/profileName';
import { Skill } from '_models/skill/skill';
import { Team } from '_models/team/team';
import { Duration } from '_models/duration';
import { AuthService } from 'app/auth/auth.service';
import { UserProfile } from '_models/profile/userProfile';
import { ProjectProfile } from '_models/profile/projectProfile';
import { UniversityProfile } from '_models/profile/universityProfile';
import { UserProfileService } from '_service/profile/user/userProfile.service';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '_service/utils/utils.service';
import { NgOnChangesFeature } from '@angular/core/src/render3';


@Component({
  selector: 'app-static-bar',
  templateUrl: 'static-bar.component.html',
  styleUrls: ['./static-bar.component.less']
})
export class StaticBarComponent implements OnInit {
  id: number;
  navbarHidden = true;
  showMenu = false;
  private sub: any;
  userName: ProfileName;
  user: UserProfile;
  fetched = false;
  showProjects = false;
  showUniversities = false;
  projects: Array<ProjectProfile>;
  universities: Array<UniversityProfile>;


  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private utils: UtilsService,
    private userProfileService: UserProfileService,
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.navbarHidden = !this.authService.isLogged();
  });
}

  ngDoCheck() {
    this.navbarHidden = !this.authService.isLogged();
    if (this.authService.isLogged() && !this.fetched) {
      this.userName = this.authService.getProfile();
      this.getUser();
      this.fetched = true;
    } else if (!this.authService.isLogged()) {this.fetched = false; }
  }

  getUser(): void {
    this.userProfileService.getUser(this.userName.id).subscribe(
        data => { this.user = data; },
    );
}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  toggleProjects() {
    this.showProjects = !this.showProjects;
  }

  toggleUniversities() {
    this.showUniversities = !this.showUniversities;
  }

  closeNav() {
    this.showMenu = false;
  }

  openNav() {
    this.showMenu = true;
  }
}
