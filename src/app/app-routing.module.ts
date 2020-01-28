import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { CircularListviewComponent } from './shared/circular/circular-listview/circular-listview.component';
import { CircularDetailComponent } from './shared/circular/circular-detail/circular-detail.component';

const routes: Routes = [
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
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
