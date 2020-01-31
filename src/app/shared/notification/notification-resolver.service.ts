import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NotificationInfo } from './notification-info.model';
import { NotificationService } from './notification.service';
import { Observable, of } from 'rxjs';
import { asLiteral } from '@angular/compiler/src/render3/view/util';

@Injectable({
  providedIn: 'root'
})
export class NotificationResolverService implements Resolve<NotificationInfo[]> {

  constructor(private notificationService: NotificationService ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): NotificationInfo[] | Observable<NotificationInfo[]> | Promise<NotificationInfo[]> {

    return this.notificationService.getNotifications();
  }

}
