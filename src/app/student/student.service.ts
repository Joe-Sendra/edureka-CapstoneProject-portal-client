import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Student, LeaveRequest } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students: Student[] = [];
  nonRegisteredStudents: { email: string, registrationNumber: string }[] = [];

  private studentsSub = new BehaviorSubject<any>(this.students.slice());
  private nonRegisteredStudentsSub = new BehaviorSubject<any>(this.nonRegisteredStudents.slice());
  // private leavePendingSub = new BehaviorSubject<{
  //   email: string,
  //   requestID: string,
  //   requestDate: Date,
  //   status: string,
  //   startDate: Date,
  //   endDate: Date
  // }[]>(this.hasLeavePending());

  constructor(private httpClient: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    // All Students
    this.getAllStudents();

    // Non Registered Students
    this.getNonRegisteredStudents();
  }


  // Students *******************************
  private getAllStudents() {
    this.httpClient.get<{students: []}>
      ('http://localhost:3000/api/v1/users/students')
      .subscribe(
        students => {
          this.students = students.students;
          this.studentsSub.next(this.students.slice());
        },
        err => console.log('Error retrieving students')
      );
  }

  getStudent(_id: string): Promise< Student> {
    return new Promise(resolve => {
      this.httpClient.get<Student>
        ('http://localhost:3000/api/v1/users/students/' + _id)
        .subscribe(
          student => {
            resolve(student);
          }
        );
    });
  }


  // Subs ***************************************
  private updateSubs() {
    this.nonRegisteredStudentsSub.next(this.getNonRegisteredStudents());
    this.studentsSub.next(this.getAllStudents());
    // this.leavePendingSub.next(this.hasLeavePending());
  }

  getStudents() {
    return this.studentsSub;
  }

  // getLeavePending() {
  //   return this.leavePendingSub;
  // }

  getNonRegistered() {
    return this.nonRegisteredStudentsSub;
  }


  // Block **************************************
  blockStudentToggle(_id, isLockedOut) {
    this.httpClient.patch<any>('http://localhost:3000/api/v1/users', {
        _id,
        updateStudentInfo: {
          isLockedOut
        }
    })
      .subscribe(
        response => {
          this.updateSubs();
        },
        err => console.log('Error retrieving students')
      );
  }


  // Password ***********************************
  // resetPassword(email, isReset) {
  //   const index = this.findWithAttr(this.students, 'email', email);
  //   this.students[index].resetPassword = isReset;
  //   this.updateSubs();
  // }


  // Leave **************************************
  // private hasLeavePending() {

  //   const allPendingRequests = new Array();

  //   this.students
  //     .filter(student => {
  //       return (student.hasOwnProperty('leave'));
  //     })
  //     .map(student => {
  //       student.leave.map(leaveRequest => {
  //         if (leaveRequest.status === 'pending') {
  //           allPendingRequests.push({email: student.email, ...leaveRequest});
  //         }
  //       });
  //     });

  //   return allPendingRequests;

  // }

  // addLeave(leave, email) {
  //   const index = this.findWithAttr(this.students, 'email', email);
  //   if (this.students[index].hasOwnProperty('leave')) {
  //     this.students[index].leave.push(leave);
  //   } else {
  //     this.students[index] = {...this.students[index], leave: [leave]};
  //   }
  //   this.updateSubs();
  // }

  // voteLeave(email, leaveId, isApproved) {
  //   const studentIndex = this.findWithAttr(this.students, 'email', email);
  //   const leaveIndex = this.findWithAttr(this.students[studentIndex].leave, 'requestID', leaveId);
  //   this.students[studentIndex].leave[leaveIndex].status = isApproved ? 'Approved' : 'Denied';
  //   this.updateSubs();
  // }

  // TODO determine if this needs to be an observable
  // getStudentLeaves(email: string) {
  //   const index = this.findWithAttr(this.students, 'email', email);
  //   if (this.students[index].hasOwnProperty('leave')) {
  //     return this.students[index].leave;
  //   }
  // }


  // Registration *******************************
  private getNonRegisteredStudents() {
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
      this.nonRegisteredStudentsSub.next(this.nonRegisteredStudents.slice());
    });
  }


  // Profile ************************************
  updateStudent(_id, updateStudentInfo: Student): Promise<{isSuccess: boolean, message: string}> {
    return new Promise(resolve => {
      this.httpClient.patch<any>('http://localhost:3000/api/v1/users',
        {
          _id,
          updateStudentInfo
        }
      )
        .subscribe(
          response => {
            if (response.isSuccess) {
              resolve({isSuccess: true, message: response.message});
              this.updateSubs();
            }
            resolve({isSuccess: false, message: response.message});
          },
          err => {
            resolve({isSuccess: true, message: 'Error retrieving students'});
            console.log(err, 'Error retrieving students');
          }
        );
    });
  }
  // updateStudent(email, newStudentInfo: Student) {
  //   const index = this.findWithAttr(this.students, 'email', email);
  //   this.students[index] = newStudentInfo;
  //   this.updateSubs();
  // }


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
            this.getNonRegisteredStudents();
            // this.updateSubs();
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

  enrollStudent(student: Student, registrationNumber: string): Promise<boolean | {error: string}> {

    // TODO need to include password
    const studentEnroll =    {
      email: student.email,
      password: 'temp',
      registrationNumber,
      role: 'student',
      name: {
        first: student.name.first,
        last: student.name.last
      }
    };

    return new Promise(resolve => {
      this.httpClient.post<any>
      ('http://localhost:3000/api/v1/users/enroll/register', {studentEnroll})
        .subscribe(responseData => {
          if (responseData.data.id) {
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

}
