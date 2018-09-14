import { Component, OnInit, Input, OnDestroy } from '@angular/core';
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
export class WallComponent implements OnInit, OnDestroy {
    @Input() profile: ProfileName;
    posts: Array<Post>;
    sub: any;

    constructor(
        private utils: UtilsService,
        private postService: PostService,
        private mainPageService: MainPageService
    ) { }

    ngOnInit() {
        if (!this.profile) {
            this.sub = this.postService.getAllPosts().subscribe(
                data => this.posts = data,
                err => console.log(err));
        }
        else {
            this.sub = this.postService.getPostsByProfile(this.profile.id).subscribe(
                data => this.posts = data,
                err => console.log(err));
        }
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }
}
