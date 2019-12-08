import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MainModule } from './main/main.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { StudentModule } from './student/student.module';

import { AppComponent } from './app.component';

import { AppNavbarService } from './app-navbar.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MainModule,
    SharedModule,
    AdminModule,
    StudentModule
  ],
  entryComponents: [],
  providers: [
    AppNavbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
