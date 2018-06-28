import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';

import { ThemeModule } from './../../@theme/theme.module';
import { DriverRoutingModule, routedComponents } from './driver-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    DriverRoutingModule,
    Ng2SmartTableModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
  ],
  declarations: [
    ...routedComponents,
  ],
  providers: [
  ],
})
export class DriverModule { }

