import { Component, Input } from '@angular/core';

import { NotificationInfo } from './notification-info.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  @Input() notification: NotificationInfo;

  // TODO consider time or expiration, specific audience?, data model

}
