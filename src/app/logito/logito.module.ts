import { NgModule } from '@angular/core';
import { ToasterModule } from 'angular2-toaster';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';

import { DashboardModule } from './../pages/dashboard/dashboard.module';
import { LogitoRoutingModule } from './logito-routing.module';
import { ThemeModule } from '../@theme/theme.module';

import { LogitoComponent } from './logito.component';
import { LogitoService } from './logito.service';
import {ClientService} from './client/client.service';
import {CompanyService} from './company/company.service';
import {DriverService} from './driver/driver.service';
import {DestinationService} from './destination/destination.service';

const PAGES_COMPONENTS = [
  LogitoComponent,
    
];

@NgModule({
  imports: [
    NgxMaskModule.forRoot(),
    LogitoRoutingModule,
    ThemeModule,
    DashboardModule,
    NgSelectModule,
    ToasterModule.forRoot(),
  ],
  declarations: [
    ...PAGES_COMPONENTS,
  ],
  providers: [
    LogitoService,
    ClientService,
    CompanyService,
    DriverService,
    DestinationService
  ],
})
export class LogitoModule {
}
