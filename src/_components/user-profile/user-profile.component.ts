import { Component, OnInit } from '@angular/core';
import { UserProfile } from '_models/profile/userProfile';
import { ActivatedRoute } from '@angular/router';
import { ProfileName } from '_models/profile/profileName';
import { UserProfileService } from '_service/profile/user/userProfile.service';
import { SkillService } from '_service/skill/skill.service';
import { PostService } from '_service/post/post.service';
import { TeamService } from '_service/team/team.service';
import { UtilsService } from '_service/utils/utils.service';

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
        private userProfileService: UserProfileService,
        private skillService: SkillService,
        private postService: PostService,
        private teamService: TeamService
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
            data => { this.user = data },
        );
    }

    getLanguages(): String {
        return this.user.languages.map(o => o.name).join(', ');
    }
}
