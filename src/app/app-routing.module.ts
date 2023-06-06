import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path:'', loadComponent: () => import('./dashboard/dashboard.component').then(x => x.DashboardComponent),
  children: [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./pages/pg-home/pg-home.component').then(x => x.PgHomeComponent) },
    { path: 'elementos', loadChildren: () => import('./pages/pg-elements/pg-elements.module').then(x => x.PgElementsModule) },
    { path: 'categorias', loadComponent: () => import('./pages/pg-categories/pg-categories.component').then(x => x.PgCategoriesComponent) }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
