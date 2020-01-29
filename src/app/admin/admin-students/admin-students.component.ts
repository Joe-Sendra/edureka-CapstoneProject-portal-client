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
  students: Student[] = [];
  leaveRequests = [];
  test = [];
  page = 1;
  pageSize = 10;
  collectionSize = 0;

  constructor(private studentService: StudentService) {}

  get studentsPage(): Student[] {
    return this.students
      .map((student, i) => ({id: i + 1, ...student}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ngOnInit() {
    this.studentsSub = this.studentService.getStudents().subscribe(students => {
      this.students = students;
      this.collectionSize = this.students.length;
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
