import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileName } from '_models/profile/profileName';
import { UniversityProfile } from '_models/profile/universityProfile';
import { UniversityProfileService } from '_service/profile/university/universityProfile.service';
import { PostService } from '_service/post/post.service';
import { error } from '@angular/compiler/src/util';

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

    constructor(
        private route: ActivatedRoute,
        private universityProfileService: UniversityProfileService,
        private postService: PostService,
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

    showDescriptionMoreButton() {
        let element = document.getElementById('description');
        let height = element.offsetHeight;

        if (height > 250) {
            return true;
        }
        return false;
    }

    getUniversity(id: number): void {
        this.universityProfileService.getUniversity(id).subscribe(
            data => { this.university = data },
        );
    }

    photoExists(profile: ProfileName): Boolean {
        return profile.photo && profile.photo.length > 0;
    }
}
