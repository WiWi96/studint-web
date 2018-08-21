import { Component, OnInit } from '@angular/core';
import { ProfileName } from '../../_models/profile/profileName';
import { MainPageService } from '../../_services/mainpage/mainpage.service';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrls: ['./test-component.component.css']
})
export class TestComponentComponent implements OnInit {

  profileNames: Array<ProfileName>;

  constructor(private maingPageServie: MainPageService) {
    //inicjalizacja pol 
  }

  ngOnInit() {
    this.getAllProfilesNames();
  }

  getAllProfilesNames() {
    this.maingPageServie.getAllProfileNames().subscribe(data => { this.profileNames = data });
  }

}
