import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AuthService } from 'app/auth/auth.service';
import { ProfileService } from '_service/profile/profile.service';
import { Router } from '@angular/router';
import { ProfileName } from '_models/profile/profileName';
import { UserType } from '_enums/userType';
import { UtilsService } from '_service/utils/utils.service';
@Component({
    selector: 'app-navigation-bar',
    templateUrl: './navigation-bar.component.html',
    styleUrls: ['./navigation-bar.component.less'],
})
export class NavigationBarComponent implements OnInit {
    isCollapsed = true;
    smallScreen: boolean;

  selected: string;
  searchExpression = '';
  profiles: ProfileName[];
  names: string[] = [];

  results = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.names )
    )
  constructor(
    private authService: AuthService,
    private router: Router,
    private profileService: ProfileService
    ) {
  }

  ngOnInit() {
    this.onResize();
  }

  search($event) {
    this.searchExpression = $event.target.value;
    if (this.searchExpression.length >= 1) {
      this.getResults();
    }
  }

    @HostListener('window:resize')
    onResize() {
        this.smallScreen = window.innerWidth < 992;
    }

  getResults() {
    this.profileService.findProfilesWithNameContaining(this.searchExpression).subscribe(data => {
      this.profiles = data;
      this.names = [];
      for (const profile of this.profiles) {
        this.names.push(profile.name);
      }
    });
  }

  goToResult() {
    const res = this.profiles.find( profile => profile.name === this.selected);
    this.router.navigate([res.type.toLowerCase(), res.id]);
    this.selected = '';
  }

  goToProfile() {
      this.authService.goToUserProfile();
  }

  goToSettings() {
    }

    signOut() {
        this.authService.logOut();
        this.router.navigate(['/']);
    }

}
