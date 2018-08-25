import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-university-profile',
    templateUrl: 'university-profile.component.html',
    styleUrls: ['./university-profile.component.less'],
})
export class UniversityProfileComponent implements OnInit {
    expanded = false;

    constructor() { }

    ngOnInit() { }

    expandDescription() {
        this.expanded = true;
    }
}
