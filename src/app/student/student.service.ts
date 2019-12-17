import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Student, Leave } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students: Student[] = [];
  nonRegisteredStudents: { email: string, registrationNumber: string }[] = [];

  devFakeUniqueID = 2; // TODO remove. for dev only

  private studentsSub = new BehaviorSubject<Student[]>(this.students.slice());
  private nonRegisteredStudentsSub = new BehaviorSubject<any>(this.nonRegisteredStudents.slice());
  private leavePendingSub = new BehaviorSubject<{
    email: string,
    requestID: string,
    requestDate: Date,
    status: string,
    startDate: Date,
    endDate: Date
  }[]>(this.hasLeavePending());

  constructor(private httpClient: HttpClient) {}

  // DEV ONLY
  getUniqueID() {
    this.devFakeUniqueID++;
    return this.devFakeUniqueID.toString();
  }

  private findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
          return i;
      }
    }
    return -1;
  }


  // Subs ***************************************
  private updateSubs() {
    this.nonRegisteredStudentsSub.next(this.getNonRegisteredStudents());
    this.studentsSub.next(this.students.slice());
    this.leavePendingSub.next(this.hasLeavePending());
  }

  getStudents() {
    return this.studentsSub;
  }

  getLeavePending() {
    return this.leavePendingSub;
  }

  getNonRegistered() {
    return this.nonRegisteredStudentsSub;
  }


  // Block **************************************
  blockStudent(email, isLockedOut) {
    const index = this.findWithAttr(this.students, 'email', email);
    this.students[index].isLockedOut = isLockedOut;
    this.updateSubs();
  }


  // Password ***********************************
  resetPassword(email, isReset) {
    const index = this.findWithAttr(this.students, 'email', email);
    this.students[index].resetPassword = isReset;
    this.updateSubs();
  }


  // Leave **************************************
  private hasLeavePending() {

    const allPendingRequests = new Array();

    this.students
      .filter(student => {
        return (student.hasOwnProperty('leave'));
      })
      .map(student => {
        student.leave.map(leaveRequest => {
          if (leaveRequest.status === 'pending') {
            allPendingRequests.push({email: student.email, ...leaveRequest});
          }
        });
      });

    return allPendingRequests;

  }

  addLeave(leave, email) {
    const index = this.findWithAttr(this.students, 'email', email);
    if (this.students[index].hasOwnProperty('leave')) {
      this.students[index].leave.push(leave);
    } else {
      this.students[index] = {...this.students[index], leave: [leave]};
    }
    this.updateSubs();
  }

  voteLeave(email, leaveId, isApproved) {
    const studentIndex = this.findWithAttr(this.students, 'email', email);
    const leaveIndex = this.findWithAttr(this.students[studentIndex].leave, 'requestID', leaveId);
    this.students[studentIndex].leave[leaveIndex].status = isApproved ? 'Approved' : 'Denied';
    this.updateSubs();
  }

  // TODO determine if this needs to be an observable
  getStudentLeaves(email: string) {
    const index = this.findWithAttr(this.students, 'email', email);
    if (this.students[index].hasOwnProperty('leave')) {
      return this.students[index].leave;
    }
  }


  // Registration *******************************
  getNonRegisteredStudents() {

    this.httpClient.get<[{_id: any, email: string}]>
    ('http://localhost:3000/api/v1/users/enroll').pipe(
      map((enrollUserData) => {
        return enrollUserData.map((user) => {
          return { email: user.email, registrationNumber: user._id };
        });
      })
    )
    .subscribe(transformedStudentData => {
      // update this instance
      this.nonRegisteredStudents = transformedStudentData;
      // update subscribers
      this.nonRegisteredStudentsSub.next(transformedStudentData);
    });


    // let nonRegistered = this.students.slice();
    // nonRegistered = nonRegistered.filter(student => !student.isRegistered).map(student => {
    //   return {email: student.email, registrationNumber: student.registrationNumber};
    // });
    // return nonRegistered;
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


  // Profile ************************************
  updateStudent(email, newStudentInfo: Student) {
    const index = this.findWithAttr(this.students, 'email', email);
    this.students[index] = newStudentInfo;
    this.updateSubs();
  }


  // Email **************************************
  sendEmail(student: Student) {
    console.log('TODO send student to server for an email to be sent: ', student);
  }

  sendEmails(students: Student[]) {
    console.log('TODO send students to server for an emails to be sent: ', students);
  }


  // Enrollment *********************************
  addEnrollment(studentEmail: string): Promise<boolean | {error: string}> {

    return new Promise(resolve => {
      this.httpClient.post<{ message: string, id: string}>
      ('http://localhost:3000/api/v1/users/enroll', {email: studentEmail})
        .subscribe(responseData => {
          if (responseData.id) {
            this.updateSubs();
            resolve(true);
          } else {
            resolve(false);
          }
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  enrollStudent(student: Student) {
    if (this.hasRegistrationNumber(student.email) && !this.isRegistered(student.email)) {
      const index = this.findWithAttr(this.students, 'email', student.email);
      if (this.verifyRegistrationNumber(student.email, student.registrationNumber)) {
        this.students[index] = { ...student, isRegistered: true };
        this.updateSubs();
      } else {
        console.log('invalid registration number');
      }
    } else {
      console.log('Error: can not enroll (can possibly already be enrolled)');
    }
  }

}
