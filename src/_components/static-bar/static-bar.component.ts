import { Component, OnInit } from '@angular/core';
import { ProfileName } from '_models/profile/profileName';
import { Skill } from '_models/skill/skill';
import { Team } from '_models/team/team';
import { Duration } from '_models/duration';
import { ProjectProfile } from '_models/profile/projectProfile';
import { UniversityProfile } from '_models/profile/universityProfile';


@Component({
  selector: 'app-static-bar',
  templateUrl: 'static-bar.component.html',
  styleUrls: ['./static-bar.component.less']
})
export class StaticBarComponent implements OnInit {
  showMenu = false;
  showProjects = false;
  showUniversities = false;
  projects: Array<ProjectProfile>;
  universities: Array<UniversityProfile>;


  constructor() {
    // temp projects initialization
    this.projects = [
      {
        id: 1,
        name: 'Project 1',
        profileName: {
          id: 1,
          name: 'Project 1',
          photo: ''
        },
        description: 'string',
        technologies: [new Skill],
        type: 'string',
        level: 'string',
        participants: [new ProfileName],
        teams: [new Team],
        participationStatus: 'string',
        startDate: new Date,
        joiningDate: new Date,
        duration: new Duration,
        status: 'string',
      },
      {
        id: 2,
        name: 'Project 2',
        profileName: {
          id: 2,
          name: 'Project 2',
          photo: ''
        },
        description: 'string',
        technologies: [new Skill],
        type: 'string',
        level: 'string',
        participants: [new ProfileName],
        teams: [new Team],
        participationStatus: 'string',
        startDate: new Date,
        joiningDate: new Date,
        duration: new Duration,
        status: 'string',
      },
      {
        id: 3,
        name: 'Project 3',
        profileName: {
          id: 3,
          name: 'Project 3',
          photo: ''
        },
        description: 'string',
        technologies: [new Skill],
        type: 'string',
        level: 'string',
        participants: [new ProfileName],
        teams: [new Team],
        participationStatus: 'string',
        startDate: new Date,
        joiningDate: new Date,
        duration: new Duration,
        status: 'string',
      },
    ];

    // temp universities initialization
    this.universities = [
      {
        profileName: {
            id: 1,
            name: 'Silesian University of Technology',
            photo: ''
        },
        description: '',
        profiles: new Map(),
        posts: [
            {
                id: 1,
                author: {
                    id: 1,
                    name: '',
                    photo: '',
                },
                publishedDate: new Date(),
                post: ''
            },
        ],
        address: {
            town: '',
            postCode: '',
            street: '',
            country: '',
            houseNo: 2,
        },
        type: '',
        courses: [
            {
                id: 1,
                name: ''
            },
        ],
      },
      {
        profileName: {
            id: 2,
            name: 'Akademia Górniczo Hutnicza w Krakowie',
            photo: ''
        },
        description: '',
        profiles: new Map(),
        posts: [
            {
                id: 1,
                author: {
                    id: 1,
                    name: '',
                    photo: '',
                },
                publishedDate: new Date(),
                post: ''
            },
        ],
        address: {
            town: '',
            postCode: '',
            street: '',
            country: '',
            houseNo: 2,
        },
        type: '',
        courses: [
            {
                id: 1,
                name: ''
            },
        ],
      },
      {
        profileName: {
            id: 3,
            name: 'Harvard University',
            photo: ''
        },
        description: '',
        profiles: new Map(),
        posts: [
            {
                id: 1,
                author: {
                    id: 1,
                    name: '',
                    photo: '',
                },
                publishedDate: new Date(),
                post: ''
            },
        ],
        address: {
            town: '',
            postCode: '',
            street: '',
            country: '',
            houseNo: 2,
        },
        type: '',
        courses: [
            {
                id: 1,
                name: ''
            },
        ],
      },
    ];

  }

  ngOnInit() {
  }

  toggleProjects() {
    this.showProjects = !this.showProjects;
  }

  toggleUniversities() {
    this.showUniversities = !this.showUniversities;
  }

  closeNav() {
    // document.getElementById('mySidenav').style.width = '0';
    this.showMenu = false;
  }

  openNav() {
    this.showMenu = true;
    // document.getElementById('mySidenav').style.width = '200px';
  }
}
