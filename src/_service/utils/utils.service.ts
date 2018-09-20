import { Injectable } from "@angular/core";
import { ProfileName } from "_models/profile/profileName";
import { Duration } from "_models/duration";
import * as moment from 'moment';
import { ProjectStatus } from "_enums/projectStatus";
import { ProjectLevel } from "_enums/projectLevel";
import { UserStatus } from "_enums/userStatus";
import { ServiceType } from "_enums/serviceTypes";
import { BsModalService } from "ngx-bootstrap";
import { ConfirmModalComponent } from "_components/_forms/confirm-modal/confirm-modal.component";

@Injectable()
export class UtilsService {
    public now = moment().startOf('day');

    constructor(private modalService: BsModalService) {

    }

    public getProjectLevelText(level: ProjectLevel): string {
        switch (level) {
            case ProjectLevel.Beginner:
                return 'Beginner';
            case ProjectLevel.Intermediate:
                return 'Intermediate';
            case ProjectLevel.Advanced:
                return 'Advanced';
            case ProjectLevel.Professional:
                return 'Professional';
            case ProjectLevel.Master:
                return 'Master';
            default:
                return undefined;
        }
    }

    public getProjectDifficultyNumber(level: ProjectLevel): number {
        switch (level) {
            case ProjectLevel.Beginner:
                return 1;
            case ProjectLevel.Intermediate:
                return 2;
            case ProjectLevel.Advanced:
                return 3;
            case ProjectLevel.Professional:
                return 4;
            case ProjectLevel.Master:
                return 5;
            default:
                return undefined;
        }
    }

    public getProjectStatusText(status: ProjectStatus): string {
        switch (status) {
            case ProjectStatus.InProgress:
                return 'In progress';
            case ProjectStatus.TBA:
                return 'To be announced';
            case ProjectStatus.Finished:
                return 'Finished';
            case ProjectStatus.Canceled:
                return 'Canceled';
            case ProjectStatus.Invite:
                return 'Open for entries';
            case ProjectStatus.Closed:
                return 'Closed for entries';
            default:
                return undefined;
        }
    }

    public getUserStatusText(status: UserStatus): string {
        switch (status) {
            case UserStatus.Ready:
                return 'Ready to join a project';
            case UserStatus.Busy:
                return 'Currently doing something';
            case UserStatus.New:
                return 'Looking around';
            case UserStatus.Inactive:
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

    public getSocialMediaName(type: ServiceType): string {
        switch (type) {
            case ServiceType.YouTube:
                return 'YouTube';
            case ServiceType.Facebook:
                return 'Facebook';
            case ServiceType.Twitter:
                return 'Twitter';
            case ServiceType.Instagram:
                return 'Instagran';
            case ServiceType.LinkedIn:
                return 'LinkedIn';
            case ServiceType.GitHub:
                return 'GitHub';
            case ServiceType.Pinterest:
                return 'Pinterest';
            case ServiceType.Google:
                return 'Google';
            case ServiceType.Custom:
            default:
                return 'Website';
        }
    }

    public getSocialMediaIconClass(type: ServiceType): string {
        switch (type) {
            case ServiceType.YouTube:
                return 'fab fa-youtube';
            case ServiceType.Facebook:
                return 'fab fa-facebook';
            case ServiceType.Twitter:
                return 'fab fa-twitter';
            case ServiceType.Instagram:
                return 'fab fa-instagram';
            case ServiceType.LinkedIn:
                return 'fab fa-linkedin';
            case ServiceType.GitHub:
                return 'fab fa-github';
            case ServiceType.Pinterest:
                return 'fab fa-pinterest';
            case ServiceType.Google:
                return 'fab fa-google';
            case ServiceType.Custom:
            default:
                return 'fas fa-globe';
        }
    }

    public photoExists(profile: ProfileName): Boolean {
        return profile != undefined && profile.photo != undefined && profile.photo.length > 0;
    }

    public showDescriptionMoreButton() {
        let element = document.getElementById('description');

        if (element) {
            let height = element.offsetHeight;

            if (height > 250) {
                return true;
            }
        }
        return false;
    }

    public openConfirmModal(message: string, confirmAction: Function, params: object) {
        const initialState = {
            message: message
        };
        let modalRef = this.modalService.show(ConfirmModalComponent, { initialState });
        modalRef.content.onClose.subscribe((confirmed) => {
            if (confirmed) {
                confirmAction(params);
            }
        });
    }
}