import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';

import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentExamComponent } from './student-exam/student-exam.component';
import { StudentProfileDetailComponent } from './student-profile/student-profile-detail/student-profile-detail.component';
import { StudentGatepassComponent } from './student-gatepass/student-gatepass.component';

@NgModule({
  declarations: [
    StudentDashboardComponent,
    StudentProfileComponent,
    StudentExamComponent,
    StudentProfileDetailComponent,
    StudentGatepassComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    StudentDashboardComponent,
    StudentProfileComponent,
    StudentExamComponent
  ],
  providers: [],
  exports: []
})
export class StudentModule { }
