import { Component, OnInit, Input } from '@angular/core';
import { Post } from '_models/post';
import { ProfileName } from '_models/profile/profileName';
import { PostService } from '_service/post/post.service';
import { MainPageService } from '_service/mainpage/mainpage.service';
import { UtilsService } from '_service/utils/utils.service';

@Component({
    selector: 'app-wall',
    templateUrl: 'wall.component.html',
    styleUrls: ['./wall.component.less'],
})
export class WallComponent implements OnInit {
    @Input() posts: Array<Post>;
    constructor(
        private utils: UtilsService,
        private postService: PostService,
        private mainPageService: MainPageService 
    ) { }

    ngOnInit() { }
}
