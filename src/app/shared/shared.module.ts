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
import { RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './password/reset-password/reset-password.component';
import { ResetPasswordResponseComponent } from './password/reset-password/reset-password-response/reset-password-response.component';
import { ChangePasswordComponent } from './password/change-password/change-password.component';

@NgModule({
  declarations: [
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    NotificationComponent,
    NotificationEditComponent,
    NotificationListComponent,
    AlertComponent,
    ResetPasswordComponent,
    ResetPasswordResponseComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
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
    LoginComponent,
    ResetPasswordComponent,
    ResetPasswordResponseComponent,
    ChangePasswordComponent
  ]
})
export class SharedModule {}
