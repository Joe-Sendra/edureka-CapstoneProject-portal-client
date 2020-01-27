import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from '../exam.service';

@Component({
  selector: 'app-exam-create',
  templateUrl: './exam-create.component.html',
  styleUrls: ['./exam-create.component.css']
})
export class ExamCreateComponent implements OnInit {

  createExamForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private examService: ExamService) {}

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.createExamForm.controls; }

  initForm() {
    this.createExamForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      location: ['', [Validators.required]]
    });
  }

  onAddExam() {
    const exam = {exam: this.createExamForm.value};
    this.examService.addExam(exam).then(isSuccess => {
      // TODO add alert
      if (isSuccess) {
        this.createExamForm.reset();
      } else {
        console.log('Error adding exam');
      }
    });
  }

}
