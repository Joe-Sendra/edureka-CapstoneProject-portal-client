import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationInfo } from 'src/app/shared/notification/notification-info.model';

@Component({
  selector: 'app-admin-publish',
  templateUrl: './admin-publish.component.html',
  styleUrls: ['./admin-publish.component.css']
})
export class AdminPublishComponent implements OnInit {

  isListView = false;
  showListViewButton = true;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        if (params.id) {
          this.showListViewButton = false;
        }
      }
    );

  }

  onEdit(notification: NotificationInfo) {
    this.router.navigate(['/admin', 'publish', notification._id]);
  }

}
