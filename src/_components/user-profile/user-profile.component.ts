import { Component, OnInit } from '@angular/core';
import { UserProfile } from '_models/profile/userProfile';
import { ProfileName } from '_models/profile/profileName';

@Component({
    selector: 'app-user-profile',
    templateUrl: 'user-profile.component.html',
    styleUrls: ['./user-profile.component.less'],
})
export class UserProfileComponent implements OnInit {
    expanded = false;
    user: UserProfile;

    constructor() {
        this.user = {
            profileName: {
                id: 1,
                name: 'Lisa Chase',
                photo: ''
            },
            description: "<p>I'm a sport enthusiast</p><p>I like pizza!</p>",
            profiles: new Map(),
            posts: [{
                id: 1,
                author: {
                    id: 1,
                    name: 'Lisa Chase',
                    photo: ''
                },
                publishedDate: new Date(2018, 8, 25, 23, 14),
                post: 'This is a personal post, don\'t read it!'
            }],
            status: 'busy',
            projects: [{
                id: 2,
                name: 'Dark project',
                photo: ''
            },
            {
                id: 3,
                name: 'Cookies',
                photo: ''
            }],
            universities: [
                {
                    id: 4,
                    name: 'Politechnika Śląska',
                    photo: ''
                },
                {
                    id: 5,
                    name: 'ATH',
                    photo: ''
                }
            ],
            skills: [
                {
                    id: 1,
                    name: 'C#'
                },
                {
                    id: 2,
                    name: 'Photoshop'
                }
            ],
            languages: [
                {
                    id: 1,
                    name: 'Polish'
                },
                {
                    id: 2,
                    name: 'English'
                },
                {
                    id: 4,
                    name: 'German'
                }
            ]
        }
    }

    ngOnInit() { }

    expandDescription() {
        this.expanded = true;
    }

    showDescriptionMoreButton() {

    }

    getLanguages(): String {
        return this.user.languages.map(o => o.name).join(', ');
    }

    photoExists(profile: ProfileName): Boolean {
        return profile.photo && profile.photo.length > 0;
    }
}
