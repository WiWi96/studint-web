import { Component, OnInit } from '@angular/core';
import { Post } from '_models/post';
import { ProfileName } from '_models/profile/profileName';

@Component({
    selector: 'app-wall',
    templateUrl: 'wall.component.html',
    styleUrls: ['./wall.component.less'],
})
export class WallComponent implements OnInit {
    public posts: Array<Post>;
    constructor() { }

    ngOnInit() { }
}
