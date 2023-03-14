import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ParentTabComponent } from './parent-tab/parent-tab.component';

const routes: Routes = [
  {
    path: '',
    component: ParentTabComponent,
  },
  {
    path: ':id',
    component: ParentTabComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
