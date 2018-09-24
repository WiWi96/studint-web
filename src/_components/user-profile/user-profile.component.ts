import { Component, OnInit } from '@angular/core';
import { UserProfile } from '_models/profile/userProfile';
import { ActivatedRoute } from '@angular/router';
import { ProfileName } from '_models/profile/profileName';
import { UserProfileService } from '_service/profile/user/userProfile.service';
import { SkillService } from '_service/skill/skill.service';
import { PostService } from '_service/post/post.service';
import { TeamService } from '_service/team/team.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentEditModalComponent } from '../_forms/student-edit-modal/student-edit-modal.component';
import { Technology } from '_models/technology/technology';
import { UtilsService } from '_service/utils/utils.service';
import { ProfileService } from '_service/profile/profile.service';
import { NotificationService } from '_service/notification/notification.service';
import { AuthService } from 'app/auth/auth.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: 'user-profile.component.html',
    styleUrls: ['./user-profile.component.less'],
})
export class UserProfileComponent implements OnInit {
    id: number;
    private sub: any;
    expanded = false;
    Arr = Array;
    user: UserProfile;

    constructor(
        private route: ActivatedRoute,
        private utils: UtilsService,
        private profileService: ProfileService,
        private userProfileService: UserProfileService,
        private skillService: SkillService,
        private postService: PostService,
        private teamService: TeamService,
        private modalService: NgbModal,
        private notificationService: NotificationService,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.getUser(this.id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getUser(id: number): void {
        this.userProfileService.getUser(id).subscribe(
            data => { this.user = data; },
        );
    }

    getLanguages(): String {
        return this.user.languages.map(o => o.name).join(', ');
    }

    openEditModal(): any {
        const modalRef = this.modalService.open(StudentEditModalComponent);
        modalRef.componentInstance.user = this.user;
    }

    sortJobs() {
        const sorted = this.user.experienceInfos
        .sort((a: any, b: any) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
        return sorted;
    }

    updateFollower() {
        this.profileService.updateFollower(this.id).subscribe(
            isFollower => this.user.isFollower = isFollower,
            () => this.notificationService.notify("Cannot follow or unfollow the profile right now. Please try again later.")
        )
    }
}
