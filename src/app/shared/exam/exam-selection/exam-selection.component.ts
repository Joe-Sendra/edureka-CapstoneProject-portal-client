import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-exam-selection',
  templateUrl: './exam-selection.component.html',
  styleUrls: ['./exam-selection.component.css']
})
export class ExamSelectionComponent implements OnInit {

  examSelectionForm: FormGroup;
  examName: string;
  examLocation: string;
  examShifts = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.examSelectionForm.controls; }

  initForm() {
    this.examSelectionForm = this.formBuilder.group({
      // examId: [{value: '', disabled: true}],
      // examDate: ['', [Validators.required]],
      // examTime: ['', [Validators.required]],
      name: ['', [Validators.required]],
      location: ['', [Validators.required]]
    });
  }

}
