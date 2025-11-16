import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'category/:id',
    loadComponent: () =>
      import('./pages/category-page/category-page.component').then(
        (m) => m.CategoryPageComponent
      ),
  },
];

