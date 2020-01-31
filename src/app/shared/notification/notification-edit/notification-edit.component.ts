import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { NotificationService } from '../notification.service';
import { NotificationInfo } from '../notification-info.model';
@Component({
  selector: 'app-notification-edit',
  templateUrl: './notification-edit.component.html',
  styleUrls: ['./notification-edit.component.css']
})
export class NotificationEditComponent implements OnInit {

  id: string;
  editMode = false;
  notificationForm: FormGroup;
  notificationPreview: NotificationInfo;

  constructor(private notificationService: NotificationService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
        this.editMode = params.id != null;
        this.initForm();
        this.updateNotificationPreview();
      }
    );

  }

  onSubmit() {
    if (this.editMode) {
      this.notificationService.updateNotification(this.id, this.notificationForm.value);
    } else {
      this.notificationService.addNotification(this.notificationForm.value);
    }
    this.onCancel();
  }

  private initForm() {

    let notificationId = '';
    let notificationType = 'info';
    let notificationHeader = '';
    let notificationTitle = '';
    let notificationMessage = '';
    const notificationCreated = new Date(Date.now()).toLocaleString();

    // if in edit mode, populate form with existing values
    if (this.editMode) {
      this.notificationService.getNotification(this.id).then(notification => {
        notificationId = notification._id;
        notificationType = notification.type;
        notificationHeader = notification.header;
        notificationTitle = notification.title;
        notificationMessage = notification.message;
      });
    }

    // this links the reactive code form to the html form
    this.notificationForm = new FormGroup({
      id: new FormControl(notificationId),
      type: new FormControl(notificationType, Validators.required),
      header: new FormControl(notificationHeader, [Validators.required, Validators.maxLength(50)]),
      title: new FormControl(notificationTitle, [Validators.required, Validators.maxLength(50)]),
      message: new FormControl(notificationMessage, [Validators.required, Validators.maxLength(300)]),
      created: new FormControl(notificationCreated)
    });

  }

  onFormInput() {
    this.updateNotificationPreview();
  }

  updateNotificationPreview() {
    this.notificationPreview = {
      _id: 'preview',
      type: this.notificationForm.controls.type.value,
      header: this.notificationForm.controls.header.value ? this.notificationForm.controls.header.value : 'Header',
      title: this.notificationForm.controls.title.value ? this.notificationForm.controls.title.value : 'Title',
      message: this.notificationForm.controls.message.value ? this.notificationForm.controls.message.value : 'Message',
      created: this.notificationForm.controls.created.value
    };
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
