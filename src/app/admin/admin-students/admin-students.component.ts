import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { StudentService } from 'src/app/student/student.service';
import { Student, Leave } from 'src/app/student/student.model';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit, OnDestroy {

  studentsSub: Subscription;
  leaveSub: Subscription;
  students: Student[];
  leaveRequests: {email: string, requestID: string, requestDate: Date, status: string, startDate: Date, endDate: Date}[];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentsSub = this.studentService.getStudents().subscribe(students => {
      this.students = students;
    });
    this.leaveSub = this.studentService.getLeavePending().subscribe(pendingLeaveRequests => {
      this.leaveRequests = pendingLeaveRequests;
    });
  }

  // TODO remove. for dev only
  onAddLeave(student) {
    // const reqID = this.leaveRequests[0] == null ? '1' : (this.leaveRequests.length + 1).toString();
    const reqID = this.studentService.getUniqueID();
    const tempLeave: Leave = {
      requestID: reqID,
      requestDate: new Date(Date.now()),
      status: 'pending',
      startDate: new Date('01/01/2020'),
      endDate: new Date('01/07/2020')
    };
    this.studentService.addLeave(tempLeave, student.email);
    this.studentService.getLeavePending();
  }

  onLeaveReview(request, isApproved) {
    this.studentService.voteLeave(request.email, request.requestID, isApproved);
  }

  onBlockStudent(student) {
    console.log('TODO block this student: ', student);
    this.studentService.blockStudent(student.email, true);
  }

  onResetPassword(student) {
    console.log('TODO reset this student password: ', student);
  }

  ngOnDestroy() {
    this.studentsSub.unsubscribe();
    this.leaveSub.unsubscribe();
  }
}
