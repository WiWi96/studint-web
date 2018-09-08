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