import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminProfileComponent } from './admin-profile/admin-profile.component';
import { AdminNavComponent } from './admin-dashboard/admin-nav/admin-nav.component';

// For development purposes only
import { AdminDevComponent } from './admin-dev/admin-dev.component';
import { AdminDevService } from './admin-dev/admin-dev.service';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminProfileComponent,
    AdminDevComponent,
    AdminNavComponent
  ],
  imports: [
    HttpClientModule,
    CommonModule
  ],
  providers: [
    AdminDevService
  ],
  exports: [
    AdminDashboardComponent
  ]
})
export class AdminModule { }
