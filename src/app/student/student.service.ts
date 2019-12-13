import { Injectable } from '@angular/core';

import { Student } from './student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students: Student[] = [];
  devFakeUniqueID = 0; // TODO remove. for dev only

  addEnrollment(studentEmail: string) {
    if (!this.hasRegistrationNumber(studentEmail)) {
      this.devFakeUniqueID++; // TODO remove. for dev only
      this.students.push({
        email: studentEmail,
        registrationNumber: this.devFakeUniqueID.toString(),
        isRegistered: false
      });
    } else {
      // TODO return message already enrolled
    }
    console.log(this.students);
  }

  enrollStudent(student: Student) {
    if (this.hasRegistrationNumber(student.email) && !this.isRegistered(student.email)) {
      const index = this.findWithAttr(this.students, 'email', student.email);
      if (this.verifyRegistrationNumber(student.email, student.registrationNumber)) {
        console.log('need to update: ', this.students[index], ' with: ', student);
      } else {
        console.log('invalid registration number');
      }
    }
  }

  verifyRegistrationNumber(email: string, registrationNumber: string): boolean {
    const index = this.findWithAttr(this.students, 'email', email);
    if (index > -1) {
      if ( this.students[index].registrationNumber === registrationNumber) {
        return true;
      }
      return false;
    }
    return false;
  }

  hasRegistrationNumber(email: string): boolean {
    const index = this.findWithAttr(this.students, 'email', email);
    if (index > -1) {
      if ( this.students[index].registrationNumber) {
        return true;
      }
      return false;
    }
    return false;
  }

  isRegistered(email: string): boolean {
    const index = this.findWithAttr(this.students, 'email', email);
    if (index > -1) {
      return this.students[index].isRegistered;
    }
    return false;
  }

  findWithAttr(array, attr, value) {
    for (let i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
          return i;
      }
    }
    return -1;
  }

}
