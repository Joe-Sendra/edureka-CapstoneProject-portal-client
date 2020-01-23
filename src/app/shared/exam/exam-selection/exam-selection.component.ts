import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from '../exam.service';
import { Subscription } from 'rxjs';
import { Exam } from '../exam.model';

@Component({
  selector: 'app-exam-selection',
  templateUrl: './exam-selection.component.html',
  styleUrls: ['./exam-selection.component.css']
})
export class ExamSelectionComponent implements OnInit, OnDestroy {

  examSelectionForm: FormGroup;
  examNames: string[] = [];
  examLocations: Exam[] = [];
  exams: Exam[] = [];
  examsSub$: Subscription;

  @Output() selectedExam = new EventEmitter<Exam>();

  constructor(private formBuilder: FormBuilder, private examService: ExamService) {}

  ngOnInit() {
    this.initForm();

    this.examService.getExams().then(examsSubject => {
      this.examsSub$ = examsSubject.subscribe(exams => {
        this.exams = exams;
        this.emitExam(this.examSelectionForm.controls.location.value);
        // Get unique exam names
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

    // filter locations based on selected exam.name
    this.examLocations = this.exams.filter((exam) => exam.name === examName.value);
    if (examName) {
      examLocation.enable();
    }

    // reset locations
    examLocation.setValue([]);
    this.emitExam(examLocation.value);

  }

  onExamChangeLocation() {
    const examLocation = this.examSelectionForm.controls.location;
    this.emitExam(examLocation.value);

  }

  emitExam(selectedExamId) {
    const examLocation = this.examSelectionForm.controls.location;
    if (selectedExamId.length > 0 && examLocation.value.length > 0) {
      this.examService.getExam(selectedExamId).then(exam => {
        this.selectedExam.emit(exam);
      });
    } else {
      this.selectedExam.emit(null);
    }

  }

  ngOnDestroy() {
    this.examsSub$.unsubscribe();
  }

}
