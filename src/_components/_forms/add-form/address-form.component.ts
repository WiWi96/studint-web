import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Address } from '_models/address';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.less']
})
export class AddressFormComponent implements OnInit {

  public addressFormGroup: FormGroup;

  public address: Address;
  constructor(
    private formBuilder: FormBuilder,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.addressFormGroup = this.formBuilder.group({
      town: [, [Validators.required]],
      postCode: ['', [Validators.required, Validators.pattern("^[a-z0-9][a-z0-9\- ]{0,10}[a-z0-9]")]],
      street: [this.address.street,Validators.required],
      country: ['', [Validators.required]],
      houseNo: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]+")]]
    })

    this.addressFormGroup.get('street').setValue(this.address.street);
    

  }

  close() {
    this.activeModal.close();
  }

  onSubmit() {
    this.address.street = this.addressFormGroup.get('street').value;
    this.activeModal.close();
  }

}
