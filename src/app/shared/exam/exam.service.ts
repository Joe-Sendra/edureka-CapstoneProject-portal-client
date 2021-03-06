import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Exam } from './exam.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  studentIDsWithGatePass = [];
  studentIDsWithoutGatePass = [];
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

  getStudents(examId: string, shiftId: string, isGatePass: boolean) {
    if (isGatePass) {
      this.getStudentsWithGatePass(examId, shiftId);
      return this.studentsWithGatePassSub;
    } else {
      this.getStudentsWithoutGatePass(examId, shiftId);
      return this.studentsWithoutGatePassSub;
    }
  }

  getExams() {
    return  this.getExamData().then(isSuccess => {
      return this.examsSub;
    });
  }

  addExam(exam) {
    return new Promise(resolve => {
      this.httpClient.post<{ message: string}>
      (`${environment.apiUrl}/exams`, exam)
        .subscribe(responseData => {
          this.getExamData();
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  getExam(examId) {
    return new Promise<Exam>(resolve => {
      this.httpClient.get<Exam>(`${environment.apiUrl}/exams/${examId}`)
      .subscribe(exam => {
        resolve(exam);
      },
      (error => {
        resolve(null);
      }));
    });
  }

  addExamShift(examID, examDate, examTime) {
    return new Promise(resolve => {
      this.httpClient.post<{ message: string}>
      (`${environment.apiUrl}/exams/${examID}`, {
        examShift: {
          examDate,
          examTime
        }
      })
        .subscribe(responseData => {
          this.getExamData();
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  deleteExamShift(examID, shiftID) {
    return new Promise(resolve => {
      this.httpClient.delete<{ message: string}>
      (`${environment.apiUrl}/exams/${examID}/shifts/${shiftID}`)
        .subscribe(responseData => {
          this.getExamData();
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  updateExamShift(examID, shiftID, newExamShift) {
    return new Promise(resolve => {
      this.httpClient.patch<{ message: string}>
      (`${environment.apiUrl}/exams/${examID}/shifts/${shiftID}`,
      {
        examShift: {
          examDate: newExamShift.date,
          examTime: newExamShift.time
        }
      })
        .subscribe(responseData => {
          this.getExamData();
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  addGatePass(examId, shiftId, studentId) {
    return new Promise(resolve => {
      this.httpClient.post<{ message: string}>
      (`${environment.apiUrl}/exams/${examId}/shifts/${shiftId}`, {
        studentID: studentId
      })
        .subscribe(responseData => {
          this.getStudentsWithGatePass(examId, shiftId);
          this.getStudentsWithoutGatePass(examId, shiftId);
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  removeGatePass(examId, shiftId, gpId) {
    return new Promise(resolve => {
      // TODO add authorization header
      this.httpClient.delete<{ message: string}>
      (`${environment.apiUrl}/exams/${examId}/shifts/${shiftId}/gp/${gpId}`)
        .subscribe(responseData => {
          this.getStudentsWithGatePass(examId, shiftId);
          this.getStudentsWithoutGatePass(examId, shiftId);
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  private getStudentsWithGatePass(examId, shiftId) {
    if (examId) {
      return new Promise(resolve => {
        this.httpClient.get<{gatePassList: any[]}>
        (`${environment.apiUrl}/exams/${examId}/shifts/${shiftId}/gp`)
          .subscribe(gatePassData => {

            this.httpClient.get<any>
            (`${environment.apiUrl}/students`)
            .subscribe(
              students => {
                const studentsWithGatepass = students.students.filter(student => {
                  const matchingStudents = gatePassData.gatePassList.map(pass => {
                    return pass.student;
                  });
                  return matchingStudents.includes(student._id);
                });

                const updatedStudentsWithGatePass = [];
                studentsWithGatepass.forEach((student, studentIndex) => {
                  gatePassData.gatePassList.forEach(gatePass => {
                    if (student._id === gatePass.student) {
                      student.gatePass = gatePass;
                      updatedStudentsWithGatePass.push(student);
                    }
                  });
                }, studentsWithGatepass);
                this.studentIDsWithGatePass = studentsWithGatepass;
                this.studentsWithGatePassSub.next(this.studentIDsWithGatePass.slice());
                resolve(true);
              }, err => resolve(false)
            );

          },
          (error => {
            resolve(false);
          })
        );
      });
    }
  }

  private getStudentsWithoutGatePass(examId, shiftId) {
    if (examId && shiftId) {
      return new Promise(resolve => {
        this.httpClient.get<{gatePassList: any[]}>
        (`${environment.apiUrl}/exams/${examId}/shifts/${shiftId}/gp`)
          .subscribe(gatePassData => {
            this.httpClient.get<any>
            (`${environment.apiUrl}/students`)
            .subscribe(
              students => {
                const studentsWithoutGatepass = students.students.filter(student => {
                  const studentsWithGatepass = gatePassData.gatePassList.map(pass => pass.student);
                  return !studentsWithGatepass.includes(student._id);
                });
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
      (`${environment.apiUrl}/exams/`)
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
