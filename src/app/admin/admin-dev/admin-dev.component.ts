import { Component, OnInit, OnDestroy } from '@angular/core';
import { StudentRegisterItem, AdminDevService } from './admin-dev.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-dev',
  templateUrl: './admin-dev.component.html',
  styleUrls: ['./admin-dev.component.css']
})
export class AdminDevComponent implements OnInit, OnDestroy {
  regTable: StudentRegisterItem[];
  getDataSub: Subscription;

  constructor(private adService: AdminDevService) {}
  ngOnInit() {
    this.getDataSub = this.adService.getRegTable().subscribe(regTable => {
      console.log(regTable);
      this.regTable = regTable;
    });
  }

  ngOnDestroy() {
    this.getDataSub.unsubscribe();
  }
}
