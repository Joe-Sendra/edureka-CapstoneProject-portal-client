import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotificationService } from '../notification/notification.service';
import { NotificationInfo } from '../notification/notification-info.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  notifications: NotificationInfo[];
  notificationsSub: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notificationsSub = this.notificationService.notificationSub
      .subscribe(notifications => {
        this.notifications = notifications;
      });
  }

  ngOnDestroy() {
    this.notificationsSub.unsubscribe();
  }

}
