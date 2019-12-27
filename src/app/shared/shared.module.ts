import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AuthService } from './auth/auth.service';

import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationEditComponent } from './notification/notification-edit/notification-edit.component';
import { NotificationListComponent } from './notification/notification-list/notification-list.component';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    NotificationComponent,
    NotificationEditComponent,
    NotificationListComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule
  ],
  exports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NotificationEditComponent,
    NotificationListComponent,
    AlertComponent
  ],
  providers: [
    AuthService
  ],
  entryComponents: [
    RegisterComponent,
    LoginComponent
  ]
})
export class SharedModule {}
