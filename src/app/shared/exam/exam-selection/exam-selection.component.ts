import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from '../exam.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exam-selection',
  templateUrl: './exam-selection.component.html',
  styleUrls: ['./exam-selection.component.css']
})
export class ExamSelectionComponent implements OnInit, OnDestroy {

  examSelectionForm: FormGroup;
  examNames = [];
  examLocations = [];
  examShifts = [];
  examsSub$: Subscription;

  @Output() selectedExamLocation = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private examService: ExamService) {}

  ngOnInit() {
    this.initForm();

    this.examService.getExams().then(examsSubject => {
      this.examsSub$ = examsSubject.subscribe(exams => {
        this.examShifts = exams;
        this.examNames = [...new Set(exams.map(exam => exam.name))];
      });
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.examSelectionForm.controls; }

  initForm() {
    this.examSelectionForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      location: [{value: '', disabled: true}, [Validators.required]]
    });
  }

  onExamChangeName() {
    const examName = this.examSelectionForm.controls.name;
    const examLocation = this.examSelectionForm.controls.location;
    this.examLocations = this.examShifts.filter((exam) => exam.name === examName.value);
    if (examName) {
      examLocation.enable();
    }
    examLocation.setValue([]);
    this.selectedExamLocation.emit(examLocation.value);
  }

  onExamChangeLocation() {
    const examLocation = this.examSelectionForm.controls.location;
    this.selectedExamLocation.emit(examLocation.value);
  }

  ngOnDestroy() {
    this.examsSub$.unsubscribe();
  }

}
