import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AuthService } from 'app/auth/auth.service';
import { ProfileService } from '_service/profile/profile.service';
import { Router } from '@angular/router';
import { ProfileName } from '_models/profile/profileName';
@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.less'],
})
export class NavigationBarComponent implements OnInit {
  isCollapsed = true;
  smallScreen: boolean;

  selected: string;
  searchExpression = 'Pola';
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
    this.getResults();
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
      for (let profile of this.profiles) {
        this.names.push(profile.name);
      }
      // this.names = [this.profiles[0].name];
    });
  }

  goToResult() {
    const res = this.profiles.find( profile => profile.name === this.selected);
    this.router.navigate([res.type, res.id]);
    console.log(res);
  }

  goToProfile() {

  }

  goToSettings() {
    console.log(this.profiles[0].name);
    console.log(this.names[0]);

  }

  signOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

}
