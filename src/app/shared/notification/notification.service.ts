import { Injectable } from '@angular/core';

import { NotificationInfo } from './notification-info.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  // TODO connect to server to get notifications from DB (api);
  private notifications: NotificationInfo[] = [
    {
      id: '1',
      type: 'info',
      header: 'Exam info',
      title: 'CS200 exam',
      message: 'This is a message about some exam, blah blah blah',
      created: 'Dec 9, 2019'
    },
    {
      id: '2',
      type: 'danger',
      header: 'Campus safety',
      title: 'Holiday safety tips',
      message: 'Be careful!',
      created: 'Dec 19, 2019'
    }
  ];

  notificationSub = new BehaviorSubject<NotificationInfo[]>(this.notifications);

  addNotification(notification: NotificationInfo) {
    this.notifications.push(notification);
    this.notificationSub.next(this.getNotifications());
  }

  updateNotification(id: string, newNotification: NotificationInfo) {
    const index = this.findWithAttr(this.notifications, 'id', id);
    this.notifications[index] = newNotification;
    this.notificationSub.next(this.getNotifications());
  }

  deleteNotification(id: string) {
    const index = this.findWithAttr(this.notifications, 'id', id);
    if (index >= 0 ) {
      this.notifications.splice(index, 1);
      this.notificationSub.next(this.getNotifications());
    }
  }

  getNotification(id: string) {
    const index = this.findWithAttr(this.notifications, 'id', id);
    return this.notifications[index];
  }

  getNotifications() {
    return this.notifications.slice();
  }

  getCount() {
    return this.notifications.length;
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
