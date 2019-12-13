import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { EnrollmentItem } from './enrollment.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  enrollmentSub = new BehaviorSubject<EnrollmentItem[]>([]);

  studentEnrollment: EnrollmentItem[] = [];

  devFakeUniqueID = 0; // TODO remove. for dev only

  getEnrollment() {
    return this.enrollmentSub;
  }

  addEnrollment(studentEmail: string) {
    // TODO generate unique regnumber (can use mongoDB auto id)
    this.devFakeUniqueID++;
    this.studentEnrollment.push({studentEmail, registrationNumber: this.devFakeUniqueID.toString()});
    this.enrollmentSub.next(this.studentEnrollment.slice());
  }

}
