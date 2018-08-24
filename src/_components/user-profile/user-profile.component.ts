import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-profile',
    templateUrl: 'user-profile.component.html',
    styleUrls: ['./user-profile.component.less'],
})
export class UserProfileComponent implements OnInit {
    expanded = false;

    constructor() { }

    ngOnInit() { }

    expandDescription() {
        this.expanded = true;
    }
}
