import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Subscription } from 'rxjs';

import { StudentService } from '../student.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { LeaveRequest, Student } from '../student.model';

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit, OnDestroy {

  user: Student;
  authSub: Subscription;
  leaveRequestForm: FormGroup;

  leaveRequests: LeaveRequest[];

  requestLeaveAlert = {
    isSuccess: null,
    message: null
  };

  constructor(private studentService: StudentService, private authService: AuthService) {}

  ngOnInit() {
    this.authSub = this.authService.getAuthStatusListener().subscribe(status => {
      this.studentService.getStudent(status._id).then(student => {
          this.user = student;
          this.getLeaveRequests();
      });
    });
    this.initForm();
    // this.leaves = this.studentService.getStudentLeaves(this.user.email);
  }

  private initForm() {
    const startDate = null;
    const endDate = null;
    this.leaveRequestForm = new FormGroup({
      startDate: new FormControl(startDate, [Validators.required]),
      endDate: new FormControl(endDate, Validators.required)
    });
  }

  // leaveRequestDateValidator(control: AbstractControl): {[key: string]: any } | null {
    // let valid = true;
    // const tomorrow = new Date(new Date(Date.now()).getTime() + 24 * 60 * 60 * 1000);
    // console.log(new Date(control.value).getUTCMilliseconds(), tomorrow.getUTCMilliseconds());
    // if (new Date(control.value) < tomorrow) {
    //   valid = false;
    // }
    // console.log(control.value);
    // console.log(new Date(control.value));
    // console.log(new Date().toJSON());
    // console.log(new Date().toJSON().split('T')[0]);
    // return valid ? null : {invalidDate: { valid: false, value: control.value }};
  // }

  onLeaveRequest() {
    const leaveRequest: LeaveRequest = {
      requestDate: new Date(Date.now()),
      status: 'pending',
      startDate: this.leaveRequestForm.controls.startDate.value,
      endDate: this.leaveRequestForm.controls.endDate.value
    };
    this.studentService.addLeave(leaveRequest, this.user._id).then(isSuccess => {
      if (isSuccess) {
        this.requestLeaveAlert.isSuccess = true;
        this.requestLeaveAlert.message = 'Request submitted';
        this.leaveRequestForm.reset();
        this.getLeaveRequests();
      } else {
        this.requestLeaveAlert.isSuccess = false;
        this.requestLeaveAlert.message = 'Error submitting request';
      }
    });
    // this.studentService.getLeavePending();
  }

  getLeaveRequests() {
    this.studentService.getStudentLeave(this.user._id).then(leaveRequests => {
      this.leaveRequests = leaveRequests;
    });
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

}
