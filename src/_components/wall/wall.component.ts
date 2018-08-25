import { Component, OnInit, Input } from '@angular/core';
import { Post } from '_models/post';

@Component({
    selector: 'app-wall',
    templateUrl: 'wall.component.html',
    styleUrls: ['./wall.component.less'],
})
export class WallComponent implements OnInit {
    @Input() posts: Array<Post>;
    constructor() { }

    ngOnInit() { }
}
