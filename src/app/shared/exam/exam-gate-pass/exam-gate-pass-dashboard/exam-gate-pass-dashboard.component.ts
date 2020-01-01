import { Component, OnInit  } from '@angular/core';
import { ExamService } from '../../exam.service';

@Component({
  selector: 'app-exam-gate-pass-dashboard',
  templateUrl: './exam-gate-pass-dashboard.component.html',
  styleUrls: ['./exam-gate-pass-dashboard.component.css']
})
export class ExamGatePassDashboardComponent implements OnInit {

  examIdList: string[] = [];
  selectedExam: string;

  constructor(private examService: ExamService) {}

  ngOnInit() {
    this.examService.getExamIdList().then(examIds => {
      this.examIdList = examIds;
      this.selectedExam = this.examIdList[0];
    });
  }


}
