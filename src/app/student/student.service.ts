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
  studentLeavePending: {
    studentId: string,
    email: string,
    leaveRequest: {
        _id: string,
        requestDate: string,
        status: string,
        startDate: string,
        endDate: string
    }
  }[] = [];

  private studentsSub = new BehaviorSubject<any>(this.students.slice());
  private nonRegisteredStudentsSub = new BehaviorSubject<any>(this.nonRegisteredStudents.slice());
  private leavePendingSub = new BehaviorSubject<any>(this.studentLeavePending.slice());

  constructor(private httpClient: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    // All Students
    this.getAllStudents();

    // Non Registered Students
    this.getNonRegisteredStudents();

    //
    this.hasLeavePending();
  }


  // Students *******************************
  private getAllStudents() {
    this.httpClient.get<{students: []}>
      ('http://localhost:3000/api/v1/students')
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
        ('http://localhost:3000/api/v1/students/' + _id)
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


  // Leave **************************************
  private hasLeavePending() {
    return new Promise<[{
      studentId: string,
      email: string,
      leaveRequest: {
          _id: string,
          requestDate: string,
          status: string,
          startDate: string,
          endDate: string
      }
    }] | boolean>(resolve => {
      this.httpClient.get<[{
        studentId: string,
        email: string,
        leaveRequest: {
            _id: string,
            requestDate: string,
            status: string,
            startDate: string,
            endDate: string
        }
      }]>
      (`http://localhost:3000/api/v1/leaves/pending`)
        .subscribe(leaveRequestData => {
          this.studentLeavePending = leaveRequestData;
          this.leavePendingSub.next(this.studentLeavePending.slice());
          resolve(leaveRequestData);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  addLeave(leaveRequest: LeaveRequest, studentID) {
    return new Promise(resolve => {
      this.httpClient.post<{ message: string, id: string}>
      (`http://localhost:3000/api/v1/students/${studentID}/leave`, {
        requestDate: leaveRequest.requestDate,
        status: leaveRequest.status,
        startDate: leaveRequest.startDate,
        endDate: leaveRequest.endDate
      })
        .subscribe(responseData => {
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  voteLeave(studentID, leaveId, isApproved) {

    return new Promise(resolve => {

      const newStatus = isApproved ? 'approved' : 'denied';

      this.httpClient.patch<{ message: string}>
      (`http://localhost:3000/api/v1/students/${studentID}/leave/${leaveId}`, {status: newStatus})
        .subscribe(responseData => {
          this.updateSubs();
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  getStudentLeave(studentID) {
    return new Promise<LeaveRequest[]>(resolve => {

      this.httpClient.get<LeaveRequest[]>
      (`http://localhost:3000/api/v1/students/${studentID}/leave`)
        .subscribe(studentLeaveData => {
          resolve(studentLeaveData);
        },
        (error => {
          resolve([]);
        })
      );
    });
  }


  // GatePass ***********************************
  getStudentGatePasses(studentID) {
    return new Promise<LeaveRequest[]>(resolve => {

      this.httpClient.get<LeaveRequest[]>
      (`http://localhost:3000/api/v1/students/${studentID}/gp`)
        .subscribe(studentGatePassData => {
          resolve(studentGatePassData);
        },
        (error => {
          resolve([]);
        })
      );
    });
  }

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


  // Email **************************************
  sendEmails(students: {email: string, registrationNumber: string}[]): Promise<boolean | {error: string}> {
    return new Promise(resolve => {
      this.httpClient.post<any>
      ('http://localhost:3000/api/v1/users/enroll/register/email', {students})
        .subscribe(responseData => {
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
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

    const studentEnroll =    {
      email: student.email,
      password: student.password,
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
