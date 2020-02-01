import { Injectable } from '@angular/core';

import { NotificationInfo } from './notification-info.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications: NotificationInfo[] = [];

  notifications$ = new BehaviorSubject<NotificationInfo[]>(this.notifications.slice());

  constructor(private httpClient: HttpClient) {
    this.getNotifications();
  }

  addNotification(notification: NotificationInfo) {
    return new Promise<boolean>(resolve => {
      this.httpClient.post<{string, NotificationInfo}>
      (`${environment.apiUrl}/notifications/`, {notification})
        .subscribe(response => {
          this.getNotifications();
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  updateNotification(id: string, notification: NotificationInfo) {
    return new Promise<boolean>(resolve => {
      this.httpClient.patch<{string}>
      (`${environment.apiUrl}/notifications/${id}`, {notification})
        .subscribe(response => {
          this.getNotifications();
          resolve(true);
        },
        (error => {
          resolve(false);
        })
      );
    });
  }

  deleteNotification(id: string) {
    return new Promise<boolean>(resolve => {
      this.httpClient.delete<{string}>
      (`${environment.apiUrl}/notifications/${id}`)
        .subscribe(isDeleted => {
          this.getNotifications();
          resolve(true);
        },
        (error => {
          console.log(error);
          resolve(false);
        })
      );
    });
  }

  getNotification(id: string): Observable<NotificationInfo> {
    return this.httpClient.get<NotificationInfo>(`${environment.apiUrl}/notifications/${id}`);
  }

  public getNotifications(): Observable<NotificationInfo[]> {
    return this.httpClient.get<NotificationInfo[]>(`${environment.apiUrl}/notifications/`);
  }

}
