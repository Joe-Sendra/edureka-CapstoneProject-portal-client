import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { TimeTable, Exam } from '../exam.model';
import { DateTimePickerComponent } from '../../date-time-picker/date-time-picker.component';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-exam-timetable',
  templateUrl: './exam-timetable.component.html',
  styleUrls: ['./exam-timetable.component.css']
})
export class ExamTimeTableComponent {

  @Input() selectedExam: Exam = null;
  @Input() isAdmin = false;

  constructor(private modalService: NgbModal, private examService: ExamService) {}


  addShift() {
    // Open modal date time picker
    const modalRef = this.modalService.open(DateTimePickerComponent);

    // Once date and time are selected add via examService
    modalRef.componentInstance.dtEmitter.subscribe(selectedDT => {
      if (!!selectedDT) {
        const shiftDate = selectedDT.selDate;
        const shiftTime = selectedDT.selTime;
        modalRef.close();
        this.examService.addExamShift(this.selectedExam._id, shiftDate, shiftTime);
      }
    });
  }

  onEdit(shiftID) {
    console.log('TODO edit: ', shiftID);
  }

  onDelete(shiftID) {
    this.examService.deleteExamShift(this.selectedExam._id, shiftID);
  }
}
