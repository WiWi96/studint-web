import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-static-bar',
  templateUrl: './static-bar.component.html',
  styleUrls: ['./static-bar.component.less']
})
export class StaticBarComponent implements OnInit {

  public projects: Array<string>;
  public showProjects: boolean;

  constructor() {
    this.showProjects = false;
    this.projects = ['item1', 'item2', 'item3'];
    //document.getElementById('mySidenav').style.width = '0';
  }

  ngOnInit() {
  }

  public toggleProjects() {
    this.showProjects = !this.showProjects;
  }

  public closeNav() {
    document.getElementById('mySidenav').style.width = '0';
  }

  public openNav() {
    document.getElementById('mySidenav').style.width = '200px';
  }
}
