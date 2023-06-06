import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./components/element-list/element-list.component').then(x => x.ElementListComponent)},
  { path: ':element', loadComponent: () => import('./components/element-info/element-info.component').then(x => x.ElementInfoComponent)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppElementsRoutingModule { }