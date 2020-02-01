import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NotificationInfo } from '../notification-info.model';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.css']
})
export class NotificationListComponent implements OnInit {
  notifications: NotificationInfo[];

  @Input() showEditButton = false;
  @Input() showDeleteButton = false;
  @Output() editedNotification = new EventEmitter<NotificationInfo>();

  constructor(private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: {notifications: NotificationInfo[]}) => {
      this.notifications = data.notifications;
    });
  }

  onEdit(notification: NotificationInfo) {
    this.editedNotification.emit(notification);
  }

  onDelete(notification: NotificationInfo) {
    this.notificationService.deleteNotification(notification._id);
    this.router.navigate(['./'], {relativeTo: this.activatedRoute});
  }

}
