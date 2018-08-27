import { Component, OnInit } from '@angular/core';
import { ProjectProfile } from '_models/profile/projectProfile';
import { ProfileName } from '_models/profile/profileName';
import * as moment from 'moment';
import { Duration } from '_models/duration';

@Component({
    selector: 'app-project-profile',
    templateUrl: 'project-profile.component.html',
    styleUrls: ['./project-profile.component.less'],
})
export class ProjectProfileComponent implements OnInit {
    expanded = false;
    project: ProjectProfile;
    Arr = Array;
    public now = moment().startOf('day');

    constructor() {
        this.project = {
            profileName: {
                id: 1,
                name: 'Cookie of the Month',
                photo: ''
            },
            description: '<p>The project is all about cookies 🍪</p>',
            technologies: [
                {
                    id: 1,
                    name: 'Flour'
                },
                {
                    id: 2,
                    name: 'Cocoa'
                },
                {
                    id: 1,
                    name: 'Chocolate'
                },
                {
                    id: 1,
                    name: 'Eggs'
                }
            ],
            type: 'Cooking',
            level: 'intermediate',
            participants: [
                {
                    id: 1,
                    name: 'Lisa Chase',
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREbV9-iTUYpckFiSiJgS6H1flN2NgeSecPGRX5M4wT8m7mRQ5xNA'
                }
            ],
            status: 'inprogress',
            startDate: new Date(2018, 7, 25),
            joiningDate: new Date(2018, 7, 31),
            duration: {
                value: 3,
                unit: 'month'
            }
        }
    }

    ngOnInit() { }

    expandDescription() {
        this.expanded = true;
    }

    showDescriptionMoreButton() {

    }

    photoExists(profile: ProfileName): Boolean {
        return profile.photo && profile.photo.length > 0;
    }

    getDateStatus(date: Date): String {
        var momentDate = moment(date);
        if (momentDate.diff(this.now, 'days') >= 10) {
            return 'future';
        }
        else if (momentDate.diff(this.now, 'days') > 1) {
            return 'tenDays';
        }
        else if (momentDate.diff(this.now, 'days') === 1) {
            return 'tomorrow';
        }
        else if (this.now.isSame(momentDate, 'days')) {
            return 'today';
        }
        else if (momentDate.diff(this.now, 'days') === -1) {
            return 'yesterday';
        }
        else {
            return 'past';
        }
    }

    getDifficultyNumber(): number {
        switch (this.project.level) {
            case 'beginner':
                return 1;
            case 'intermediate':
                return 2;
            case 'advanced':
                return 3;
            case 'professional':
                return 4;
            case 'master':
                return 5;
            default:
                return undefined;
        }
    }

    getDurationUnit(duration: Duration): String {
        var text: String = duration.unit;
        if (duration.value !== 0) {
            if (text.slice(-1) === 'y') {
                text = text.slice(-1) + "ie";
            }
            else if (text.slice(-1) === 's') {
                text += "e";
            }
            text += "s";
        }
        return text;
    }
}
