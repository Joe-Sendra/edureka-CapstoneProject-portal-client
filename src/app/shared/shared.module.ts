import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth/auth.service';

@NgModule({
  declarations: [
    RegisterComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule
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
