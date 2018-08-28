import { Component, OnInit } from '@angular/core';
import { UserProfile } from '_models/profile/userProfile';
import { ProfileName } from '_models/profile/profileName';
import { UserProfileService } from '_service/profile/user/userProfile.service';
import { SkillService } from '_service/skill/skill.service';
import { PostService } from '_service/post/post.service';
import { TeamService } from '_service/team/team.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: 'user-profile.component.html',
    styleUrls: ['./user-profile.component.less'],
})
export class UserProfileComponent implements OnInit {
    expanded = false;
    user: UserProfile;

    constructor(
        private userProfileService: UserProfileService,
        private skillService: SkillService,
        private postService: PostService,
        private teamService: TeamService
    ) {
        this.user = {
            profileName: {
                id: 1,
                name: 'Lisa Chase',
                photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREbV9-iTUYpckFiSiJgS6H1flN2NgeSecPGRX5M4wT8m7mRQ5xNA'
            },
            description: "<p>I'm a sport enthusiast</p><p>I like pizza!</p>",
            profiles: new Map(),
            posts: [{
                id: 1,
                author: {
                    id: 1,
                    name: 'Lisa Chase',
                    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREbV9-iTUYpckFiSiJgS6H1flN2NgeSecPGRX5M4wT8m7mRQ5xNA'
                },
                publishedDate: new Date(2018, 8, 25, 23, 14),
                post: 'This is a personal post, don\'t read it!'
            }],
            status: 'ready',
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
