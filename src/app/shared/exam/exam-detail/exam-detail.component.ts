import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-exam-detail',
  templateUrl: './exam-detail.component.html',
  styleUrls: ['./exam-detail.component.css']
})
export class ExamDetailComponent implements OnInit {

  examDetailForm: FormGroup;
  addExamMessage = {
    isSuccess: null,
    message: null
  };

  constructor(private formBuilder: FormBuilder, private examService: ExamService) {}

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.examDetailForm.controls; }

  initForm() {
    this.examDetailForm = this.formBuilder.group({
      examId: [{value: '', disabled: true}],
      examDate: ['', [Validators.required]],
      examTime: ['', [Validators.required]],
      name: ['', [Validators.required]],
      location: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.examService.addExam(this.examDetailForm.value).then(isSuccess => {
      if (isSuccess) {
        this.addExamMessage.isSuccess = true;
        this.addExamMessage.message = 'Exam was successfully added.';
        this.examDetailForm.reset();
      } else {
        this.addExamMessage.isSuccess = false;
        this.addExamMessage.message = 'Exam could not be added.';
      }
    });
  }

}

