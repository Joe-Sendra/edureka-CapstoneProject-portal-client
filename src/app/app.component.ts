import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'portal-client';

  constructor(private router: Router) {
    this.router.config.unshift(
      { path: 'login', component: LoginComponent }
    );
    console.log(this.router.config);
  }
}
