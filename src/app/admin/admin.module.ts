import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminStudentsComponent } from './admin-students/admin-students.component';
import { AdminPublishComponent } from './admin-publish/admin-publish.component';
import { AdminEnrollmentComponent } from './admin-enrollment/admin-enrollment.component';
import { AdminSiteComponent } from './admin-site/admin-site.component';
import { AdminUsersEditComponent } from './admin-users/admin-users-edit/admin-users-edit.component';
import { AdminEnrollmentListComponent } from './admin-enrollment/admin-enrollment-list/admin-enrollment-list.component';

import { AdminDevComponent } from './admin-dev/admin-dev.component'; // TODO remove - For development purposes only
import { AdminDevService } from './admin-dev/admin-dev.service'; // TODO remove - For development purposes only

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminProfileComponent,
    AdminDevComponent,
    AdminStudentsComponent,
    AdminPublishComponent,
    AdminEnrollmentComponent,
    AdminSiteComponent,
    AdminUsersEditComponent,
    AdminEnrollmentListComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
    SharedModule
  ],
  entryComponents: [
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
