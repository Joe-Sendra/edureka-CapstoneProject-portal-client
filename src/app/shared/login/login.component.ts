import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  authSub: Subscription;
  routeSub: Subscription;

  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute) {
    this.routeSub = this.route.data.subscribe(data => {
      if (data.isLogout) {
        this.authService.updateLoginStatus(false, null);
      }
    });
  }

  ngOnInit() {
    this.authSub = this.authService.getLoginStatus().subscribe();
  }

  loginUser() {
    this.authService.updateLoginStatus(true, 'student');
    this.router.navigate(['student']);
  }

  loginAdmin() {
    this.authService.updateLoginStatus(true, 'admin');
    this.router.navigate(['admin']);
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
    this.routeSub.unsubscribe();
  }

}
