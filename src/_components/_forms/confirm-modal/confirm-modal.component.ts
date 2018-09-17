import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.less']
})
export class ConfirmModalComponent implements OnInit {

  message: string;

  public onClose: Subject<boolean>;

  constructor(public modalRef: BsModalRef) { }

  ngOnInit() {
    this.onClose = new Subject();
  }

  onConfirm() {
    this.onClose.next(true);
    this.modalRef.hide();
  }

  onDecline() {
    this.onClose.next(false);
    this.modalRef.hide();
  }

}
