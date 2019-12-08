import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';

import { AuthService } from './auth/auth.service';
import { AppNavbarService } from './app-navbar.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    AdminModule,
    StudentModule
  ],
  entryComponents: [],
  providers: [
    AuthService,
    AppNavbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
