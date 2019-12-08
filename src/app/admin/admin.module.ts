import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminPublishComponent } from './admin-publish/admin-publish.component';
import { AdminEnrollmentComponent } from './admin-enrollment/admin-enrollment.component';
import { AdminSiteComponent } from './admin-site/admin-site.component';

// For development purposes only
import { AdminDevComponent } from './admin-dev/admin-dev.component';
import { AdminDevService } from './admin-dev/admin-dev.service';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminProfileComponent,
    AdminDevComponent,
    AdminStudentsComponent,
    AdminPublishComponent,
    AdminEnrollmentComponent,
    AdminSiteComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule
  ],
  entryComponents: [
    AdminDashboardComponent,
    AdminProfileComponent,
    AdminStudentsComponent,
    AdminPublishComponent,
    AdminEnrollmentComponent,
    AdminSiteComponent
  ],
  providers: [
    AdminDevService
  ],
  exports: []
})
export class AdminModule { }
