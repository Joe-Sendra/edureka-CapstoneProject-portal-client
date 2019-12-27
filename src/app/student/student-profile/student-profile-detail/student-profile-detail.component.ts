import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Student } from '../../student.model';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-student-profile-detail',
  templateUrl: './student-profile-detail.component.html',
  styleUrls: ['./student-profile-detail.component.css']
})
export class StudentProfileDetailComponent implements OnInit {

  @Input()student: Student;
  updateStudentMessage: {isSuccess: boolean, message: string} = { isSuccess: null, message: null};
  profileForm: FormGroup;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    const nameFirst = this.student.name.first;
    const nameLast = this.student.name.last;
    let street;
    let city;
    let state;
    let zipcode;
    if (this.student.address) {
      street = this.student.address.street ? this.student.address.street : '';
      city = this.student.address.city ? this.student.address.city : '';
      state = this.student.address.state ? this.student.address.state : '';
      zipcode = this.student.address.zipcode ? this.student.address.zipcode : '';
    }
    let phoneHome;
    let phoneWork;
    let phoneMobile;
    if (this.student.phone) {
      phoneHome = this.student.phone.home ? this.student.phone.home : '';
      phoneWork = this.student.phone.work ? this.student.phone.work : '';
      phoneMobile = this.student.phone.mobile ? this.student.phone.mobile : '';
    }

    this.profileForm = new FormGroup({
      email: new FormControl({value: this.student.email, disabled: true}),
      nameFirst: new FormControl(nameFirst),
      nameLast: new FormControl(nameLast),
      street: new FormControl(street),
      city: new FormControl(city),
      state: new FormControl(state),
      zipcode: new FormControl(zipcode),
      phoneHome: new FormControl(phoneHome),
      phoneWork: new FormControl(phoneWork),
      phoneMobile: new FormControl(phoneMobile),
    });
  }

  onCancel() {
    this.profileForm.reset();
    this.initForm();
  }

  onSubmit() {
    const formControls = this.profileForm.controls;
    const newStudentInfo: Student = {
      email: this.student.email,
      role: 'student',
      name: {
        first: formControls.nameFirst.value,
        last: formControls.nameLast.value
      },
      address: {
        street: formControls.street.value,
        city: formControls.city.value,
        state: formControls.state.value,
        zipcode: formControls.zipcode.value
      },
      phone: {
        home: formControls.phoneHome.value,
        work: formControls.phoneWork.value,
        mobile: formControls.phoneMobile.value
      }
    };
    this.studentService.updateStudent(this.student._id, newStudentInfo).then(response => {
      this.updateStudentMessage = response;
    });
  }

}
