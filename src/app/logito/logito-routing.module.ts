import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { LogitoComponent } from './logito.component';
import { DashboardComponent } from './../pages/dashboard/dashboard.component';

const routes: Routes = [{
  path: '',
  component: LogitoComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    }, {
      path: 'clients',
      loadChildren: './client/client.module#ClientModule'
    }, {
      path: 'companies',
      loadChildren: './company/company.module#CompanyModule'
    }, {
      path: 'drivers',
      loadChildren: './driver/driver.module#DriverModule'
    }, {
      path: 'destinations',
      loadChildren: './destination/destination.module#DestinationModule'
    }, {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogitoRoutingModule {
}
