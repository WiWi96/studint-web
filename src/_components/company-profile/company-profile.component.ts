import { Component, OnInit } from '@angular/core';
import { CompanyProfileService } from '_service/profile/company/companyProfile.service';

@Component({
    selector: 'app-company-profile',
    templateUrl: 'company-profile.component.html',
    styleUrls: ['./company-profile.component.less'],
})
export class CompanyProfileComponent implements OnInit {
    expanded = false;

    constructor(private companyProfileService: CompanyProfileService) { }

    ngOnInit() { }

    expandDescription() {
        this.expanded = true;
    }
}
