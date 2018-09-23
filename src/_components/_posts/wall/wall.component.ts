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
    posts: Array<Post> = [];
    sub: any;
    oldestPostId: number;
    bottomWasReached = false;
    noMorePosts = false;

    constructor(
        private utils: UtilsService,
        private postService: PostService,
        private mainPageService: MainPageService
    ) { }

    ngOnInit() {
        if (!this.profile) {
            this.getFollowedPosts();
        }
        else {
            this.getUserPosts();
        }
    }

    getFollowedPosts() {
        if (!this.noMorePosts) {
            this.sub = this.postService.getFollowedPosts(this.oldestPostId).subscribe(
                data => {
                    if (data && data.length !== 0) {
                        this.posts = this.posts.concat(data);
                        this.oldestPostId = data[data.length - 1].id;
                    }
                    else {
                        this.noMorePosts = true;
                    }
                },
                err => console.log(err));
        }
    }

    getUserPosts() {
        this.sub = this.postService.getPostsByProfile(this.profile.id).subscribe(
            data => this.posts = data,
            err => console.log(err));
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    scrolledToBottom(event: { target: Element, visible: boolean }, last: boolean) {
        if (!this.profile && last && event.visible && !this.bottomWasReached) {
            this.getFollowedPosts();
        }
        this.bottomWasReached = event.visible;
    }
}
