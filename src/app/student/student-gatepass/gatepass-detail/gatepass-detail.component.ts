import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-gatepass-detail',
  templateUrl: './gatepass-detail.component.html',
  styleUrls: ['./gatepass-detail.component.css']
})
export class GatepassDetailComponent {

  @Input()public gatePass;
  @Input()public studentId;

  constructor(public activeModal: NgbActiveModal) {}

  onDownloadGatepass() {
    // TODO
  }

}
