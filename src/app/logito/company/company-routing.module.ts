import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyComponent } from './company.component';
import { CompanyListComponent } from './list/company-list.component';
import { CompanyEditComponent } from './edit/company-edit.component';

const routes: Routes = [{
  path: '',
  component: CompanyComponent,
  children: [
      {
        path: '',
        component: CompanyListComponent,
      },
      {
        path: 'add',
        component: CompanyEditComponent,
      },
      {
        path: 'edit/:id',
        component: CompanyEditComponent,
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
export class CompanyRoutingModule { }

export const routedComponents = [
  CompanyComponent,
  CompanyListComponent,
  CompanyEditComponent,
];

