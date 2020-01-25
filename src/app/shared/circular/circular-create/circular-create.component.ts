import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-circular-create',
  templateUrl: './circular-create.component.html',
  styleUrls: ['./circular-create.component.css']
})
export class CircularCreateComponent implements OnInit {

  circularCreateForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  // convenience getter for easy access to form fields
  get f() { return this.circularCreateForm.controls; }

  initForm() {
    this.circularCreateForm = this.formBuilder.group({
      date: ['', [Validators.required]],
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      paragraph: ['', [Validators.required]],
      imgUrl: ['', [Validators.required]]
    });
  }

  onCreateCircular() {
    console.log(this.circularCreateForm.value);
    this.circularCreateForm.reset();
  }



}
