import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompanyProfile } from '_models/profile/companyProfile';
import { ProfileName } from '_models/profile/profileName';
import { CompanyProfileService } from '_service/profile/company/companyProfile.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CompanyUniversityEditModalComponent } from '../_forms/company-university-edit-modal/company-university-edit-modal.component';




@Component({
    selector: 'app-company-profile',
    templateUrl: 'company-profile.component.html',
    styleUrls: ['./company-profile.component.less'],
})
export class CompanyProfileComponent implements OnInit {
    sub: any;
    id: number;
    company: CompanyProfile;

    expanded = false;

    socialServices = ['https://github.com', 'https://twitter.co', 'https://www.facebook.com'];

    constructor(
        private route: ActivatedRoute,
        private companyProfileService: CompanyProfileService,
        private modalService: NgbModal
    ) { }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.getCompany(this.id);
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    getCompany(id: number): void {
        this.companyProfileService.getCompany(id).subscribe(
            data => { this.company = data },
            err => console.error(err)
        );
    }

    expandDescription() {
        this.expanded = true;
    }

    photoExists(profile: ProfileName): Boolean {
        return profile.photo && profile.photo.length > 0;
    };
    openEditModal(): any {
        const modalRef = this.modalService.open(CompanyUniversityEditModalComponent);
        modalRef.componentInstance.companyProfile = this.company;
        modalRef.componentInstance.isCompany = true;
        modalRef.componentInstance.socialServices = this.socialServices
    }
}
