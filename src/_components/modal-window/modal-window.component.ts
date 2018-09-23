import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UniversityProfileService } from '_service/profile/university/universityProfile.service';
import { UserProfileService } from '_service/profile/user/userProfile.service';
import { CompanyProfileService } from '_service/profile/company/companyProfile.service';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.less']
})
export class ModalWindowComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal,
    private universityProfileService: UniversityProfileService,
    private userProfileService: UserProfileService,
    private companyProfileService: CompanyProfileService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {


  }

}
