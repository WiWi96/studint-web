import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileName } from '_models/profile/profileName';
import { UniversityProfile } from '_models/profile/universityProfile';
import { UniversityProfileService } from '_service/profile/university/universityProfile.service';
import { PostService } from '_service/post/post.service';
import { error } from '@angular/compiler/src/util';
import { CompanyUniversityEditModalComponent } from '../_forms/company-university-edit-modal/company-university-edit-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilsService } from '_service/utils/utils.service';
import { ProfileService } from '_service/profile/profile.service';
import { NotificationService } from '_service/notification/notification.service';

@Component({
    selector: 'app-university-profile',
    templateUrl: 'university-profile.component.html',
    styleUrls: ['./university-profile.component.less'],
})
export class UniversityProfileComponent implements OnInit, OnDestroy {
    id: number;
    expanded = false;
    private sub: any;
    university: UniversityProfile;

    socialServices = ['https://github.com', 'https://www.facebook.com', 'https://twitter.co',  'https://www.instagram.com', 'https://www.linkedin.com',
    'https://www.goldenline.com', 'https://www.github.com', 'https://www.pinterest.com', 'https://www.google.com', 'https://www.custom.com'];

    constructor(
        private route: ActivatedRoute,
        private utils: UtilsService,
        private universityProfileService: UniversityProfileService,
        private postService: PostService,
        private modalService: NgbModal,
        private profileService: ProfileService,
        private notificationService: NotificationService
    ) {
    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.getUniversity(this.id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getUniversity(id: number): void {
        this.universityProfileService.getUniversity(id).subscribe(
            data => { this.university = data },
        );
    }

    photoExists(profile: ProfileName): Boolean {
        return profile.photo && profile.photo.length > 0;
    }

    openEditModal() {
        const modalRef = this.modalService.open(CompanyUniversityEditModalComponent);
        modalRef.componentInstance.univeristyProfile = this.university;
        modalRef.componentInstance.isUniversity = true;
        modalRef.componentInstance.socialServices = this.socialServices
    }

    updateFollower() {
        this.profileService.updateFollower(this.id).subscribe(
            isFollower => this.university.isFollower = isFollower,
            () => this.notificationService.notify("Cannot follow or unfollow the profile right now. Please try again later.")
        )
    }
}
