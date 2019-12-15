import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Student, Leave } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students: Student[] = [{
    email: 'j@j.com',
    isRegistered: true,
    name: {
      first: 'Joe',
      last: 'Sendra'
    },
    registrationNumber: '1'
  }];

    devFakeUniqueID = 0; // TODO remove. for dev only

  // TODO consider a function to update all subs
  studentsSub = new BehaviorSubject<Student[]>(this.students.slice());
  nonRegisteredStudentsSub = new BehaviorSubject<Student[]>(this.getNonRegisteredStudents());
  leavePendingSub = new BehaviorSubject<{email: string, leave: Leave}[]>(this.hasLeavePending());

  constructor() {}

  getStudents() {
    return this.studentsSub;
  }

  getLeavePending() {
    return this.leavePendingSub;
  }

  addLeave(leave, email) {
    const index = this.findWithAttr(this.students, 'email', email);
    if (this.students[index].hasOwnProperty('leave')) {
      this.students[index].leave.push(leave);
    } else {
      this.students[index] = {...this.students[index], leave: [leave]};
    }
    this.nonRegisteredStudentsSub.next(this.getNonRegisteredStudents());
    this.studentsSub.next(this.students.slice());
    this.leavePendingSub.next(this.hasLeavePending());
  }

  private hasLeavePending() {
    let pendingLeave: {email: string, leave: Leave}[] = [null];

    this.students.filter(student => {
      if (student.hasOwnProperty('leave')) {
        const leave = student.leave.filter(leaveRequest => {
          if (leaveRequest.status === 'pending') {
            return true;
          }
        }).map(leaveRequest => {
          return { email: student.email, leave: leaveRequest };
        });
        pendingLeave = leave;
      }
    });

    return pendingLeave;
  }

  voteLeave(email, leaveId, isApproved) {
    const studentIndex = this.findWithAttr(this.students, 'email', email);
    const leaveIndex = this.findWithAttr(this.students[studentIndex].leave, 'requestID', leaveId);
    this.students[studentIndex].leave[leaveIndex].status = isApproved ? 'Approved' : 'Denied';
    this.nonRegisteredStudentsSub.next(this.getNonRegisteredStudents());
    this.studentsSub.next(this.students.slice());
    this.leavePendingSub.next(this.hasLeavePending());
  }

  getNonRegisteredStudents(): Student[] {
    let nonRegistered = this.students.slice();
    nonRegistered = nonRegistered.filter(student => !student.isRegistered).map(student => {
      return {email: student.email, registrationNumber: student.registrationNumber};
    });
    return nonRegistered;
  }

  sendEmail(student: Student) {
    console.log('TODO send student to server for an email to be sent: ', student);
  }

  sendEmails(students: Student[]) {
    console.log('TODO send students to server for an emails to be sent: ', students);
  }

  addEnrollment(studentEmail: string) {
    if (!this.hasRegistrationNumber(studentEmail)) {
      this.devFakeUniqueID++; // TODO remove. for dev only
      this.students.push({
        email: studentEmail,
        registrationNumber: this.devFakeUniqueID.toString(),
        isRegistered: false
      });
      this.nonRegisteredStudentsSub.next(this.getNonRegisteredStudents());
      this.studentsSub.next(this.students.slice());
      return true;
    } else {
      console.log('This student already has a registration number!');
      return false;
    }
  }

  enrollStudent(student: Student) {
    if (this.hasRegistrationNumber(student.email) && !this.isRegistered(student.email)) {
      const index = this.findWithAttr(this.students, 'email', student.email);
      if (this.verifyRegistrationNumber(student.email, student.registrationNumber)) {
        this.students[index] = { ...student, isRegistered: true };
        this.nonRegisteredStudentsSub.next(this.getNonRegisteredStudents());
        this.studentsSub.next(this.students.slice());
      } else {
        console.log('invalid registration number');
      }
    } else {
      console.log('Error: can not enroll (can possibly already be enrolled)');
    }
  }

  verifyRegistrationNumber(email: string, registrationNumber: string): boolean {
    const index = this.findWithAttr(this.students, 'email', email);
    if (index > -1) {
      if ( this.students[index].registrationNumber === registrationNumber) {
        return true;
      }
      return false;
    }
    return false;
  }

  hasRegistrationNumber(email: string): boolean {
    const index = this.findWithAttr(this.students, 'email', email);
    if (index > -1) {
      if ( this.students[index].registrationNumber) {
        return true;
      }
      return false;
    }
    return false;
  }

  isRegistered(email: string): boolean {
    const index = this.findWithAttr(this.students, 'email', email);
    if (index > -1) {
      return this.students[index].isRegistered;
    }
    return false;
  }

  findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
          return i;
      }
    }
    return -1;
  }

}
