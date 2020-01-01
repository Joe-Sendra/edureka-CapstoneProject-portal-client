import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(private httpClient: HttpClient) {}

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
}
