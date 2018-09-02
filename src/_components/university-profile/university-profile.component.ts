import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileName } from '_models/profile/profileName';
import { UniversityProfile } from '_models/profile/universityProfile';
import { UniversityProfileService } from '_service/profile/university/universityProfile.service';
import { PostService } from '_service/post/post.service';
import { error } from '@angular/compiler/src/util';
import { NgbModal } from '../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { CompanyUniversityEditModalComponent } from '../_forms/company-university-edit-modal/company-university-edit-modal.component';

@Component({
    selector: 'app-university-profile',
    templateUrl: 'university-profile.component.html',
    styleUrls: ['./university-profile.component.less'],
})
export class UniversityProfileComponent implements OnInit {
    id: number;
    expanded = false;
    private sub: any;
    university: UniversityProfile;
    socialServices = ['https://github.com', 'https://twitter.co', 'https://www.facebook.com'];

    constructor(
        private route: ActivatedRoute,
        private universityProfileService: UniversityProfileService,
        private postService: PostService,
        private modalService: NgbModal
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
            err => console.error(err)
        );
    }

    expandDescription() {
        this.expanded = true;
    }

    photoExists(profile: ProfileName): Boolean {
        return profile.photo && profile.photo.length > 0;
    }

    openEditModal(): any {
        const modalRef = this.modalService.open(CompanyUniversityEditModalComponent);
        modalRef.componentInstance.univeristyProfile = this.university;
        modalRef.componentInstance.isUniversity = true;
        modalRef.componentInstance.socialServices = this.socialServices
    }
}
