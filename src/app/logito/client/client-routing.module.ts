import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientComponent } from './client.component';
import { ClientListComponent } from './list/client-list.component';
import { ClientEditComponent } from './edit/client-edit.component';
import { ClientDirectionComponent } from './direction/client-direction.component';


const routes: Routes = [{
  path: '',
  component: ClientComponent,
  children: [
      {
        path: '',
        component: ClientListComponent,
      },
      {
        path: 'edit/:id',
        component: ClientEditComponent,
      },
      {
        path: 'add',
        component: ClientEditComponent,
      }
  ],
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  providers: [],
})
export class ClientRoutingModule { }

export const routedComponents = [
  ClientComponent,
  ClientListComponent,
  ClientEditComponent,
  ClientDirectionComponent,
];

