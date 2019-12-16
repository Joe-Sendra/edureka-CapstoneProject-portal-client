import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  email = '';
  regNumber = '';

  constructor(private studentService: StudentService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.email = params.get('email');
      this.regNumber = params.get('reg');
    });

    this.initForm();
  }

  private initForm() {

    let firstName = '';
    let lastName = '';

    this.registerForm = new FormGroup({
      email: new FormControl(this.email, [Validators.email, Validators.required]),
      regNumber: new FormControl(this.regNumber, Validators.required),
      firstName: new FormControl(firstName, Validators.required),
      lastName: new FormControl(lastName, Validators.required)
    });
  }

  // TODO add more profile fields (include on form template)
  onSubmit() {
    const studentRegister: Student = {
      email: this.registerForm.controls.email.value,
      registrationNumber: this.registerForm.controls.regNumber.value,
      name: {
        first: this.registerForm.controls.firstName.value,
        last: this.registerForm.controls.lastName.value
      }
    };
    this.studentService.enrollStudent(studentRegister);
  }

}
