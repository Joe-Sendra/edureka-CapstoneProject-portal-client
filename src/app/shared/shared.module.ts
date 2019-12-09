import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth/auth.service';

import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationEditComponent } from './notification/notification-edit/notification-edit.component';

@NgModule({
  declarations: [
    RegisterComponent,
    HomeComponent,
    LoginComponent,
    NotificationComponent,
    NotificationEditComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    NotificationEditComponent
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
