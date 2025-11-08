import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'category/:id',
    loadComponent: () =>
      import('./pages/category/category.component').then(
        (m) => m.CategoryComponent
      ),
  },
];

