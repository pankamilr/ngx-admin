import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DestinationComponent } from './destination.component';
import { DestinationListComponent } from './list/destination-list.component';
import { DestinationEditComponent } from './edit/destination-edit.component';

const routes: Routes = [{
  path: '',
  component: DestinationComponent,
  children: [
      {
        path: '',
        component: DestinationListComponent,
      },
      {
        path: 'add',
        component: DestinationEditComponent,
      },
      {
        path: 'edit/:id',
        component: DestinationEditComponent,
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
export class DestinationRoutingModule { }

export const routedComponents = [
  DestinationComponent,
  DestinationListComponent,
  DestinationEditComponent,
];

