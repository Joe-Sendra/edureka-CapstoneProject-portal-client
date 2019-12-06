import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';


@NgModule({
  declarations: [
    StudentDashboardComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
  exports: [
    StudentDashboardComponent
  ]
})
export class StudentModule { }
