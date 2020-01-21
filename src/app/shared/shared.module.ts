import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPrintModule } from 'ngx-print';
import { ExportAsModule } from 'ngx-export-as';

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
import { ExamDetailComponent } from './exam/exam-detail/exam-detail.component';
import { ExamGatePassListviewComponent } from './exam/exam-gate-pass/exam-gate-pass-listview/exam-gate-pass-listview.component';
import { ExamGatePassDashboardComponent } from './exam/exam-gate-pass/exam-gate-pass-dashboard/exam-gate-pass-dashboard.component';
import { ExamSelectionComponent } from './exam/exam-selection/exam-selection.component';
import { ExamTimeTableComponent } from './exam/exam-timetable/exam-timetable.component';

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
    ChangePasswordComponent,
    ExamDetailComponent,
    ExamGatePassListviewComponent,
    ExamGatePassDashboardComponent,
    ExamSelectionComponent,
    ExamTimeTableComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPrintModule,
    ExportAsModule
  ],
  exports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NotificationEditComponent,
    NotificationListComponent,
    AlertComponent,
    ExamDetailComponent,
    ExamGatePassListviewComponent,
    ExamGatePassDashboardComponent,
    ExamSelectionComponent,
    ExamTimeTableComponent,
    NgxPrintModule,
    ExportAsModule
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
