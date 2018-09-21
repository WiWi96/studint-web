import { Injectable } from "@angular/core";
import { ProfileName } from "_models/profile/profileName";
import { Duration } from "_models/duration";
import * as moment from 'moment';

@Injectable()
export class UtilsService {
    public now = moment().startOf('day');

    public getProjectLevelText(level: string): string {

        switch (level) {
            case 'BEGINNER':
                return 'Beginner';
            case 'INTERMEDIATE':
                return 'Intermediate';
            case 'ADVANCED':
                return 'Advanced';
            case 'PROFESSIONAL':
                return 'Professional';
            case 'MASTER':
                return 'Master';
            default:
                return undefined;
        }
    }

    public getProjectDifficultyNumber(level: string): number {
        switch (level) {
            case 'BEGINNER':
                return 1;
            case 'INTERMEDIATE':
                return 2;
            case 'ADVANCED':
                return 3;
            case 'PROFESSIONAL':
                return 4;
            case 'MASTER':
                return 5;
            default:
                return undefined;
        }
    }

    public getProjectStatusCase(level: number): string {
        switch (level) {
            case 1:
                return 'BEGINNER';
            case 2:
                return 'INTERMEDIATE';
            case 3:
                return 'ADVANCED';
            case 4:
                return 'PROFESSIONAL';
            case 5:
                return 'MASTER';
            default:
                return undefined;
        }
    }

    public getProjectStatusText(status: string): string {
        switch (status) {
            case 'IN_PROGRESS':
                return 'In progress';
            case 'TBA':
                return 'To be announced';
            case 'FINISHED':
                return 'Finished';
            case 'CANCELED':
                return 'Canceled';
            case 'INVITE':
                return 'Open for entries';
            default:
                return undefined;
        }
    }


    public getUserStatusText(status: string): string {
        switch (status) {
            case 'READY':
                return 'Ready to join a project';
            case 'BUSY':
                return 'Currently doing something';
            case 'NEW':
                return 'Looking around';
            case 'INACTIVE':
                return 'I\'m away for a while';
            default:
                return undefined;
        }
    }

    public getOrdinal(number: number): string {
        if (number > 0) {
            switch (number % 10) {
                case 1:
                    return number + 'st';
                case 2:
                    return number + 'nd';
                case 3:
                    return number + 'rd';
                default:
                    return number + 'th';
            }
        }
    }

    public getDateStatus(date: Date): String {
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

    public getDateRangeText(start: string, end: string): String {
        if (start) {
            if (end) {
                return 'from ' + start + ' till ' + end;
            }
            return 'since ' + start;
        }
        if (end) {
            return 'till ' + end;
        }
    }

    public getDurationUnit(duration: Duration): String {
        if (duration) {
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

    public getSocialMediaName(type: string): string {
        switch (type) {
            case 'youtube':
                return 'YouTube';
            case 'facebook':
                return 'Facebook';
            case 'twitter':
                return 'Twitter';
            case 'instagram':
                return 'Instagran';
            case 'linkedin':
                return 'LinkedIn';
            case 'github':
                return 'GitHub';
            case 'pinterest':
                return 'Pinterest';
            case 'google':
                return 'Google';
            case 'custom':
            default:
                return 'Website';
        }
    }

    public getSocialMediaIconClass(type: string): string {
        switch (type) {
            case 'youtube':
                return 'fab fa-youtube';
            case 'facebook':
                return 'fab fa-facebook';
            case 'twitter':
                return 'fab fa-twitter';
            case 'instagram':
                return 'fab fa-instagram';
            case 'linkedin':
                return 'fab fa-linkedin';
            case 'github':
                return 'fab fa-github';
            case 'pinterest':
                return 'fab fa-pinterest';
            case 'google':
                return 'fab fa-google';
            case 'custom':
            default:
                return 'fas fa-globe';
        }
    }

    public photoExists(profile: ProfileName): Boolean {
        return profile != undefined && profile.photo != undefined && profile.photo.length > 0;
    }

    public showDescriptionMoreButton() {
        let element = document.getElementById('description');
        let height = element.offsetHeight;

        if (height > 250) {
            return true;
        }
        return false;
    }
}