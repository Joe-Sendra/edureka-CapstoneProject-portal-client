import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminProfileComponent
  ],
  imports: [
    MatButtonModule
  ],
  exports: [
    AdminDashboardComponent
  ]
})
export class AdminModule { }
