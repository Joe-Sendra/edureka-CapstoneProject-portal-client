import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { CircularListviewComponent } from './shared/circular/circular-listview/circular-listview.component';
import { CircularDetailComponent } from './shared/circular/circular-detail/circular-detail.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { NotificationResolverService } from './shared/notification/notification-resolver.service';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    resolve: { notifications: NotificationResolverService }
  },
  {
    path: 'circular',
    component: CircularListviewComponent
  },
  {
    path: 'circular/:id',
    component: CircularDetailComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
