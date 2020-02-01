import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { NotificationService } from '../notification.service';
import { NotificationInfo } from '../notification-info.model';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
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
  editNotification$: Observable<NotificationInfo>;

  constructor(private notificationService: NotificationService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.id = params.id;
        this.editMode = params.id != null;
        this.initForm();
        this.updateNotificationPreview();

        if (this.editMode) {
          this.editNotification$ = this.notificationService.getNotification(this.id).pipe(
            tap(notification => this.notificationForm.patchValue(notification))
          );
        }
      }
    );

  }

  onSubmit() {
    if (this.editMode) {
      this.notificationService.updateNotification(this.id, this.notificationForm.value);
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      this.notificationService.addNotification(this.notificationForm.value);
    }
  }

  private initForm() {

    const notificationId = '';
    const notificationType = 'info';
    const notificationHeader = '';
    const notificationTitle = '';
    const notificationMessage = '';
    const notificationCreated = new Date(Date.now()).toLocaleString();

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
    if (this.editMode) {
      this.router.navigate(['../'], {relativeTo: this.route});
    } else {
      this.notificationForm.reset();
      this.initForm();
    }
  }

}
