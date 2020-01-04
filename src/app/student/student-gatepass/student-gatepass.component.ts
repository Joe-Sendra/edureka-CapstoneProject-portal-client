import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { GatepassDetailComponent } from './gatepass-detail/gatepass-detail.component';

@Component({
  selector: 'app-student-gatepass',
  templateUrl: './student-gatepass.component.html',
  styleUrls: ['./student-gatepass.component.css']
})
export class StudentGatepassComponent implements OnInit, OnChanges {
  @Input()user: Student;
  gatePasses = []; // TODO define gatepass model

  constructor(private studentService: StudentService, private modalService: NgbModal) {}

    ngOnInit() {
      this.getStudentGatePasses();
    }

    ngOnChanges() {
      this.getStudentGatePasses();
    }

    getStudentGatePasses() {
      this.studentService.getStudentGatePasses(this.user._id).then(gatePasses => {
        this.gatePasses = gatePasses;
      });
    }

    openModal(pass) {
      const modalRef = this.modalService.open(GatepassDetailComponent);
      modalRef.componentInstance.gatePass = pass;
      modalRef.componentInstance.studentId = this.user._id;
    }

}
