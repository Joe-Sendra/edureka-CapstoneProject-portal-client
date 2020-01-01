import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Exam } from './exam.model';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  studentIDsWithGatePass: string[] = [];
  studentIDsWithoutGatePass: string[] = ['TODO students without gatepass'];
  exams: Exam[] = [];

  private studentsWithGatePassSub = new BehaviorSubject<any>(this.studentIDsWithGatePass.slice());
  private studentsWithoutGatePassSub = new BehaviorSubject<any>(this.studentIDsWithoutGatePass.slice());
  private examsSub = new BehaviorSubject<Exam[]>(this.exams.slice());

  constructor(private httpClient: HttpClient) {
    this.loadInitialData();
  }

  loadInitialData() {
    this.getExamData();
  }

  getStudents(examId: string, isGatePass: boolean) {
    if (isGatePass) {
      this.getStudentsWithGatePass(examId);
      return this.studentsWithGatePassSub;
    } else {
      this.getStudentsWithoutGatePass(examId);
      return this.studentsWithoutGatePassSub;
    }
  }

  getExams() {
    this.getExamData();
    return this.examsSub;
  }

  addExam(exam) {
    return new Promise(resolve => {
      this.httpClient.post<{ message: string}>
      ('http://localhost:3000/api/v1/exams', {exam})
        .subscribe(responseData => {
          console.log(responseData);
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  addGatePass(examId, studentId) {
    return new Promise(resolve => {
      this.httpClient.post<{ message: string}>
      ('http://localhost:3000/api/v1/exams/gp', {
        examID: examId,
        studentID: studentId
      })
        .subscribe(responseData => {
          this.getStudentsWithGatePass(examId);
          this.getStudentsWithoutGatePass(examId);
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  removeGatePass(examId, studentId) {
    return new Promise(resolve => {
      // TODO add authorization header
      this.httpClient.delete<{ message: string}>
      (`http://localhost:3000/api/v1/exams/gp/${examId}/${studentId}`)
        .subscribe(responseData => {
          this.getStudentsWithGatePass(examId);
          this.getStudentsWithoutGatePass(examId);
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  private getStudentsWithGatePass(examId) {
    if (examId) {
      return new Promise(resolve => {
        this.httpClient.get<{gatePassList: string[]}>
        ('http://localhost:3000/api/v1/exams/gp/' + examId)
          .subscribe(responseData => {
            this.studentIDsWithGatePass = responseData.gatePassList;
            this.studentsWithGatePassSub.next(this.studentIDsWithGatePass.slice());
            resolve(true);
          },
          (error => {
            resolve(false);
          })
        );
      });
    }

  }

  private getStudentsWithoutGatePass(examId) {
    if (examId) {
      return new Promise(resolve => {
        this.httpClient.get<{gatePassList: string[]}>
        ('http://localhost:3000/api/v1/exams/gp/' + examId)
          .subscribe(gatePassData => {

            this.httpClient.get<any>
            ('http://localhost:3000/api/v1/users/students')
            .subscribe(
              students => {
                const allStudents = students.students.map(student => student._id);
                const studentsWithoutGatepass = allStudents.filter(id => !gatePassData.gatePassList.includes(id));
                this.studentIDsWithoutGatePass = studentsWithoutGatepass;
                this.studentsWithoutGatePassSub.next(this.studentIDsWithoutGatePass.slice());
                resolve(true);
              },
              err => resolve(false)
            );

          },
          (error => {
            resolve(false);
          })
        );
      });
    }

  }

  private getExamData() {
    return new Promise(resolve => {
      this.httpClient.get<Exam[]>
      ('http://localhost:3000/api/v1/exams/')
        .subscribe(examData => {
          this.exams = examData;
          this.examsSub.next(this.exams.slice());
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  getExamIdList(): Promise<string[]> {
    return new Promise(resolve => {
      this.getExamData().then(() => {
        resolve(this.exams.map(exam => exam._id));
      });
    });
  }

}
