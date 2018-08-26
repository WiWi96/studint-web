import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-company-profile',
    templateUrl: 'company-profile.component.html',
    styleUrls: ['./company-profile.component.less'],
})
export class CompanyProfileComponent implements OnInit {
    expanded = false;

    constructor() { }

    ngOnInit() { }

    expandDescription() {
        this.expanded = true;
    }
}
