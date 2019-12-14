import { Injectable } from '@angular/core';

import { Student } from './student.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  students: Student[] = [];
  devFakeUniqueID = 0; // TODO remove. for dev only

  studentsSub = new BehaviorSubject<Student[]>(this.students.slice());
  nonRegisteredStudentsSub = new BehaviorSubject<Student[]>(this.getNonRegisteredStudents());

  constructor() {}

  getNonRegisteredStudents(): Student[] {
    let nonRegistered = this.students.slice();
    nonRegistered = nonRegistered.filter(student => !student.isRegistered).map(student => {
      return {email: student.email, registrationNumber: student.registrationNumber};
    });
    return nonRegistered;
  }

  sendEmail(student: Student) {
    console.log('TODO send student to server for an email to be sent: ', student);
  }

  sendEmails(students: Student[]) {
    console.log('TODO send students to server for an emails to be sent: ', students);
  }

  addEnrollment(studentEmail: string) {
    if (!this.hasRegistrationNumber(studentEmail)) {
      this.devFakeUniqueID++; // TODO remove. for dev only
      this.students.push({
        email: studentEmail,
        registrationNumber: this.devFakeUniqueID.toString(),
        isRegistered: false
      });
      this.nonRegisteredStudentsSub.next(this.getNonRegisteredStudents());
      console.log('Registration number: ' + this.devFakeUniqueID + ' assigned to this email.');
    } else {
      console.log('This student already has a registration number!');
    }
    // console.log(this.students);
  }

  enrollStudent(student: Student) {
    if (this.hasRegistrationNumber(student.email) && !this.isRegistered(student.email)) {
      const index = this.findWithAttr(this.students, 'email', student.email);
      if (this.verifyRegistrationNumber(student.email, student.registrationNumber)) {
        console.log('need to update: ', this.students[index], ' with: ', student);
        this.students[index] = { ...student, isRegistered: true };
        console.log('after: ', this.students[index]);
        this.nonRegisteredStudentsSub.next(this.getNonRegisteredStudents());
      } else {
        console.log('invalid registration number');
      }
    } else {
      console.log('Error: can not enroll (can possibly already be enrolled)');
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
