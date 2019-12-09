import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  // TODO consider time or expiration, specific audience?, data model

  // TODO get this from an input or service
  notifications = [
    {
      type: 'info',
      header: 'Exam info',
      title: 'CS200 exam',
      message: 'This is a message about some exam, blah blah blah',
      created: 'Dec 9, 2019'
    },
    {
      type: 'danger',
      header: 'Campus safety',
      title: 'Holiday safety tips',
      message: 'Be careful!',
      created: 'Dec 19, 2019'
    },
    {
      type: 'danger',
      header: 'Campus safety',
      title: 'Holiday safety tips',
      message: 'Be careful!',
      created: 'Dec 19, 2019'
    },
    {
      type: 'danger',
      header: 'Campus safety',
      title: 'Holiday safety tips',
      message: 'Be careful!',
      created: 'Dec 19, 2019'
    },
    {
      type: 'info',
      header: 'Exam info',
      title: 'CS200 exam',
      message: 'This is a message about some exam, blah blah blah',
      created: 'Dec 9, 2019'
    },
    {
      type: 'danger',
      header: 'Campus safety',
      title: 'Holiday safety tips',
      message: 'Be careful!',
      created: 'Dec 19, 2019'
    },
    {
      type: 'info',
      header: 'Campus safety',
      title: 'Holiday safety tips',
      message: 'Be careful!',
      created: 'Dec 19, 2019'
    },
    {
      type: 'info',
      header: 'Campus safety',
      title: 'Holiday safety tips',
      message: 'Be careful!',
      created: 'Dec 19, 2019'
    }
  ];
}
