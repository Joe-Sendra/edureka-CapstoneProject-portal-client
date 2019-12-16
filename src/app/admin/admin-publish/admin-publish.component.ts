import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationInfo } from 'src/app/shared/notification/notification-info.model';

@Component({
  selector: 'app-admin-publish',
  templateUrl: './admin-publish.component.html',
  styleUrls: ['./admin-publish.component.css']
})
export class AdminPublishComponent {

  isListView = false;

  constructor(private router: Router) {}

  onEdit(notification: NotificationInfo) {
    this.router.navigate(['/admin', 'publish', notification.id]);
  }

}
