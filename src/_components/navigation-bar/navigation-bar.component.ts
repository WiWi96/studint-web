import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { AuthService } from 'app/auth/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '_service/profile/profile.service';
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
  loggedUser: ProfileName;

  selected: string;
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Dakota',
    'North Carolina',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming'
  ];

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.states.filter(v => v.toLowerCase().includes(term.toLocaleLowerCase())).splice(0, 10))
    )
  constructor(private authService: AuthService,
    private router: Router,
    private utils: UtilsService) {
  }

  ngOnInit() {
    this.onResize();
    this.authService.getLoggedProfile().subscribe(
      data => this.loggedUser = data
    )
  }

  @HostListener('window:resize')
  onResize() {
    this.smallScreen = window.innerWidth < 992;
  }

  goToProfile() {
    if (this.loggedUser) {
      this.router.navigate([this.utils.getUserRouterLink(this.loggedUser.type), this.loggedUser.id]);
    }
  }

  goToSettings() {

  }

  signOut() {
    this.authService.logOut();
    this.router.navigate(['/']);
  }

}
