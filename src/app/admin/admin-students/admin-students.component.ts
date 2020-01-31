import { Component, OnInit, OnDestroy, OnChanges, ViewChildren, QueryList } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { StudentService } from 'src/app/student/student.service';
import { Student } from 'src/app/student/student.model';
import { NgbdSortableHeader, SortEvent } from 'src/app/shared/directives/sortable.directive';

@Component({
  selector: 'app-admin-students',
  templateUrl: './admin-students.component.html',
  styleUrls: ['./admin-students.component.css']
})
export class AdminStudentsComponent implements OnInit, OnDestroy {

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  students$: Observable<Student[]>;
  total$: Observable<number>;

  // studentsSub: Subscription;
  // students: Student[] = [];
  leaveSub: Subscription;
  leaveRequests = [];

  // studentsTable = {
  //   page: 1,
  //   pageSize: 10,
  //   collectionSize: 0
  // };

  leavesTable = {
    page: 1,
    pageSize: 10,
    collectionSize: 0
  };

  constructor(public studentService: StudentService) {
    this.students$ = studentService.students$;
    this.total$ = studentService.total$;
  }

  onSort({column, direction}: SortEvent) {
    console.log({column, direction});
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.studentService.sortColumn = column;
    this.studentService.sortDirection = direction;
  }

  // get studentsPage(): Student[] {
  //   return this.students
  //     .map((student, i) => ({id: i + 1, ...student}))
  //     .slice((this.studentsTable.page - 1) * this.studentsTable.pageSize,
  //       (this.studentsTable.page - 1) * this.studentsTable.pageSize + this.studentsTable.pageSize);
  // }

  get leavesPage() {
    return this.leaveRequests
      .map((leave, i) => ({id: i + 1, ...leave}))
      .slice((this.leavesTable.page - 1) * this.leavesTable.pageSize,
        (this.leavesTable.page - 1) * this.leavesTable.pageSize + this.leavesTable.pageSize);
  }

  ngOnInit() {
    // this.studentsSub = this.studentService.getStudents().subscribe(students => {
    //   this.students = students;
    //   this.studentsTable.collectionSize = this.students.length;
    // });
    this.leaveSub = this.studentService.getLeavePending().subscribe(pendingLeaveRequests => {
      if (pendingLeaveRequests.length > 0) {
        this.leaveRequests = pendingLeaveRequests;
      } else {
        this.leaveRequests = [];
      }
      this.leavesTable.collectionSize = this.leaveRequests.length;
    });
  }

  onLeaveReview(request, isApproved) {
    this.studentService.voteLeave(request.studentId, request.leaveRequest._id, isApproved);
  }

  onBlockStudent(student: Student) {
    this.studentService.blockStudentToggle(student._id, !student.isLockedOut);
  }

  ngOnDestroy() {
    // this.studentsSub.unsubscribe();
    this.leaveSub.unsubscribe();
  }
}
