import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.less']
})
export class AddressFormComponent implements OnInit {

  addressFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.addressFormGroup = this.formBuilder.group({
      town: ['', [Validators.required, Validators.pattern("[a-zA-Z]+")]],
      postCode: ['', [Validators.required, Validators.pattern("^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]")]],
      street: ['', [Validators.required, Validators.pattern("[a-zA-z]+")]],
      country: ['', [Validators.required]],
      houseNo: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]+")]]
    })
  }

  close() {
    this.activeModal.close();
  }

}
