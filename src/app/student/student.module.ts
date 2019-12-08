import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentExamComponent } from './student-exam/student-exam.component';


@NgModule({
  declarations: [
    StudentDashboardComponent,
    StudentProfileComponent,
    StudentExamComponent
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
    StudentDashboardComponent,
    StudentProfileComponent,
    StudentExamComponent
  ],
  providers: [],
  exports: [
    StudentDashboardComponent
  ]
})
export class StudentModule { }
