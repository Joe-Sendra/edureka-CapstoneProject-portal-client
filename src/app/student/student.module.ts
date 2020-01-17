import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxBarcodeModule } from 'ngx-barcode';

import { SharedModule } from '../shared/shared.module';

import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentExamComponent } from './student-exam/student-exam.component';
import { StudentProfileDetailComponent } from './student-profile/student-profile-detail/student-profile-detail.component';
import { StudentGatepassComponent } from './student-gatepass/student-gatepass.component';
import { GatepassDetailComponent } from './student-gatepass/gatepass-detail/gatepass-detail.component';

@NgModule({
  declarations: [
    StudentProfileComponent,
    StudentExamComponent,
    StudentProfileDetailComponent,
    StudentGatepassComponent,
    GatepassDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxBarcodeModule
  ],
  entryComponents: [
    StudentProfileComponent,
    StudentExamComponent,
    GatepassDetailComponent
  ],
  providers: [],
  exports: []
})
export class StudentModule { }
