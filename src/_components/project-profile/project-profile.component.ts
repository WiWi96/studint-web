import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectProfile } from '_models/profile/projectProfile';
import { ProfileName } from '_models/profile/profileName';
import * as moment from 'moment';
import { Duration } from '_models/duration';
import { ProjectProfileService } from '_service/profile/project/projectProfile.service';
import { PostService } from '_service/post/post.service';
import { SkillService } from '_service/skill/skill.service';

@Component({
    selector: 'app-project-profile',
    templateUrl: 'project-profile.component.html',
    styleUrls: ['./project-profile.component.less'],
})
export class ProjectProfileComponent implements OnInit {
    expanded = false;
    sub: any;
    id: number;
    project: ProjectProfile;
    Arr = Array;
    public now = moment().startOf('day');

    constructor(
        private route: ActivatedRoute,
        private projectProfileService: ProjectProfileService,
        private postService: PostService,
        private skillService: SkillService
    ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.getProject(this.id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getProject(id: number): void {
        this.projectProfileService.getProject(id).subscribe(
            data => { this.project = data },
        );
    }

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
        if (this.project) {
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
        return undefined;
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
