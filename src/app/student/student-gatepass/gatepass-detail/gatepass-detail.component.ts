import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

@Component({
  selector: 'app-gatepass-detail',
  templateUrl: './gatepass-detail.component.html',
  styleUrls: ['./gatepass-detail.component.css']
})
export class GatepassDetailComponent {

  @Input()public gatePass;
  @Input()public studentId;

  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementId: 'print-section', // the id of html/table element
  };

  constructor(public activeModal: NgbActiveModal, private exportAsService: ExportAsService) {}

  onDownloadGatepass() {
    this.exportAsService.save(this.exportAsConfig, 'gatepass').subscribe(() => {
      this.activeModal.close();
    });
  }

}
