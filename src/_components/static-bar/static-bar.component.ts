import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-static-bar',
  templateUrl: 'static-bar.component.html',
  styleUrls: ['./static-bar.component.less']
})
export class StaticBarComponent implements OnInit {
  showMenu = false;
  public projects: Array<string>;
  public showProjects: boolean;

  constructor() {
    this.showProjects = false;
    this.projects = ['item1', 'item2', 'item3'];
  }

  ngOnInit() {
  }

  public toggleProjects() {
    this.showProjects = !this.showProjects;
  }

  public closeNav() {
    // document.getElementById('mySidenav').style.width = '0';
    this.showMenu = false;
  }

  openNav() {
    this.showMenu = true;
    // document.getElementById('mySidenav').style.width = '200px';
  }
}
