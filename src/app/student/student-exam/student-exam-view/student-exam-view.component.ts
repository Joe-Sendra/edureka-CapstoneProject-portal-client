import { Component } from '@angular/core';

import { ExportAsService, ExportAsConfig } from 'ngx-export-as';

import { Exam } from 'src/app/shared/exam/exam.model';

@Component({
  selector: 'app-student-exam-view',
  templateUrl: './student-exam-view.component.html',
  styleUrls: ['./student-exam-view.component.css']
})
export class StudentExamViewComponent {

  selectedExam: Exam;
  exportAsConfig: ExportAsConfig = {
    type: 'pdf', // the type you want to download
    elementId: 'print-section', // the id of html/table element
  };

  constructor(private exportAsService: ExportAsService) {}

  onSelectedExam(exam) {
    this.selectedExam = exam;
  }

  onDownloadTimeTable() {
    this.exportAsService.save(this.exportAsConfig, 'examTimeTable').subscribe(() => {
      console.log('Downloading timetable');
    });
  }

}
