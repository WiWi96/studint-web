import { Component, OnInit, Input } from '@angular/core';
import { Post } from '_models/post';
import { ProfileName } from '_models/profile/profileName';

@Component({
    selector: 'app-wall',
    templateUrl: 'wall.component.html',
    styleUrls: ['./wall.component.less'],
})
export class WallComponent implements OnInit {
    @Input() posts: Array<Post>;
    constructor() { }

    ngOnInit() { }

    photoExists(profile: ProfileName): Boolean {
        return profile.photo && profile.photo.length > 0;
    }
}
