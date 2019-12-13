import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { StudentService } from 'src/app/student/student.service';
import { Student } from 'src/app/student/student.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    let email = '';
    let regNumber = '';
    this.registerForm = new FormGroup({
      email: new FormControl(email, [Validators.email, Validators.required]),
      regNumber: new FormControl(regNumber, Validators.required)
    });
  }

  onSubmit() {
    const studentRegister: Student = {
      email: this.registerForm.controls.email.value,
      registrationNumber: this.registerForm.controls.regNumber.value
    };
    this.studentService.enrollStudent(studentRegister);
  }

}
