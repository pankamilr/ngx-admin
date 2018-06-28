import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DriverComponent } from './driver.component';
import { DriverListComponent } from './list/driver-list.component';
import { DriverEditComponent } from './edit/driver-edit.component';

const routes: Routes = [{
  path: '',
  component: DriverComponent,
  children: [
      {
        path: '',
        component: DriverListComponent,
      },
      {
        path: 'add',
        component: DriverEditComponent,
      },
      {
        path: 'edit/:id',
        component: DriverEditComponent,
      },
  ],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [],
})
export class DriverRoutingModule { }

export const routedComponents = [
  DriverComponent,
  DriverListComponent,
  DriverEditComponent,
];

