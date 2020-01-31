import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, of } from 'rxjs';
import { map, tap, debounceTime, switchMap, delay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Student, LeaveRequest } from './student.model';
import { SortDirection } from '../shared/directives/sortable.directive';

interface SearchResult {
  students: Student[];
  total: number;
}

interface State {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: string;
  sortDirection: SortDirection;
}

function compare(v1, v2) {
  return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
}

function sort(students: Student[], column: string, direction: string): Student[] {
  if (direction === '') {
    return students;
  } else {
    return [...students].sort((a, b) => {
      const prop = column.split('.');
      let i = 0;
      while ( i < prop.length) {
        a = a[prop[i]];
        b = b[prop[i]];
        i++;
      }
      const res = compare(a, b);
      return direction === 'asc' ? res : -res;
    });
  }
}

function matches(student: Student, term: string) {
  return student.name.first.toLowerCase().includes(term.toLowerCase())
    || student.name.last.toLowerCase().includes(term.toLowerCase())
    || student.email.toLowerCase().includes(term.toLowerCase());
}


@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _loading$ = new BehaviorSubject<boolean>(true);
  private _search$ = new Subject<void>();
  private _students$ = new BehaviorSubject<Student[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state: State = {
    page: 1,
    pageSize: 10,
    searchTerm: '',
    sortColumn: '',
    sortDirection: ''
  };


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

  private studentsSub = new BehaviorSubject<Student[]>(this.students.slice());
  private nonRegisteredStudentsSub = new BehaviorSubject<any>(this.nonRegisteredStudents.slice());
  private leavePendingSub = new BehaviorSubject<any>(this.studentLeavePending.slice());

  constructor(private httpClient: HttpClient) {

    this._search$.pipe(
      tap(() => this._loading$.next(true)),
      debounceTime(200),
      switchMap(() => this._search()),
      delay(200),
      tap(() => this._loading$.next(false))
    ).subscribe(result => {
      this._students$.next(result.students);
      this._total$.next(result.total);
    });
    this._search$.next();

    this.loadInitialData();
  }

  // Getters only
  get students$() { return this._students$.asObservable(); }
  get total$() { return this._total$.asObservable(); }
  get loading$() { return this._loading$.asObservable(); }

  // Setters only
  set sortColumn(sortColumn: string) { this._set({sortColumn}); }
  set sortDirection(sortDirection: SortDirection) { this._set({sortDirection}); }

  // Getter and Setter pairs
  get pageSize() { return this._state.pageSize; }
  set pageSize(pageSize: number) { this._set({pageSize}); }

  get page() { return this._state.page; }
  set page(page: number) { this._set({page}); }

  get searchTerm() { return this._state.searchTerm; }
  set searchTerm(searchTerm: string) { this._set({searchTerm}); }

  private _set(patch: Partial<State>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search(): Observable<SearchResult> {
    const {sortColumn, sortDirection, pageSize, page, searchTerm} = this._state;

    // 1. sort
    let students = sort(this.students, sortColumn, sortDirection);

    // 2. filter
    students = students.filter(student => matches(student, searchTerm));
    const total = students.length;

    // 3. paginate
    students = students.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
    return of({students, total});
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
  private getAllStudents(): (Student[] | any) {
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
  updateStudent(_id, updateUserInfo: Student): Promise<{isSuccess: boolean, message: string}> {
    return new Promise(resolve => {
      this.httpClient.patch<any>('http://localhost:3000/api/v1/users',
        {
          _id,
          updateUserInfo
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
