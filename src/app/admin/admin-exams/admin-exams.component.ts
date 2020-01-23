import { Component } from '@angular/core';
import { Exam } from 'src/app/shared/exam/exam.model';

@Component({
  selector: 'app-admin-exams',
  templateUrl: './admin-exams.component.html',
  styleUrls: ['./admin-exams.component.css']
})
export class AdminExamsComponent {

  selectedExam: Exam;

  onSelectedExam(exam) {
    this.selectedExam = exam;
  }

}
