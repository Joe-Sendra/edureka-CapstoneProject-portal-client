import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';

import { NotificationInfo } from '../notification-info.model';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit, OnDestroy {
  notifications: NotificationInfo[];
  notifications$: Subscription;

  @Input() showEditButton = false;
  @Input() showDeleteButton = false;
  @Output() editedNotification = new EventEmitter<NotificationInfo>();

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.notifications$ = this.notificationService.notifications$
      .subscribe(notifications => {
        this.notifications = notifications;
      });
  }

  onEdit(notification: NotificationInfo) {
    this.editedNotification.emit(notification);
  }

  onDelete(notification: NotificationInfo) {
    this.notificationService.deleteNotification(notification._id);
  }

  ngOnDestroy() {
    this.notifications$.unsubscribe();
  }

}
