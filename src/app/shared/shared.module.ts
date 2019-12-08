import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

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
  entryComponents: [
    RegisterComponent,
    LoginComponent
  ]
})
export class SharedModule {}
