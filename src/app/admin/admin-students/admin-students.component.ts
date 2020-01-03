import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { StudentService } from 'src/app/student/student.service';
import { Student, LeaveRequest } from 'src/app/student/student.model';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit, OnDestroy {

  studentsSub: Subscription;
  leaveSub: Subscription;
  students = new Array(); // TODO force students: Student[] type
  leaveRequests = [];
  test = [];

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.studentsSub = this.studentService.getStudents().subscribe(students => {
      this.students = students;
    });
    this.leaveSub = this.studentService.getLeavePending().subscribe(pendingLeaveRequests => {
      if (pendingLeaveRequests.length > 0) {
        this.leaveRequests = pendingLeaveRequests;
      } else {
        this.leaveRequests = [];
      }
    });
  }

  onLeaveReview(request, isApproved) {
    this.studentService.voteLeave(request.studentId, request.leaveRequest._id, isApproved);
  }

  onBlockStudent(student: Student) {
    this.studentService.blockStudentToggle(student._id, !student.isLockedOut);
  }

  ngOnDestroy() {
    this.studentsSub.unsubscribe();
    this.leaveSub.unsubscribe();
  }
}
