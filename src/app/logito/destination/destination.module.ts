import { NgModule } from '@angular/core';
import {MAT_DATE_LOCALE, MatInputModule,MatDatepickerModule, MatExpansionModule, MatIconModule, MatFormFieldModule, MatNativeDateModule} from '@angular/material';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMaskModule } from 'ngx-mask';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { ThemeModule } from './../../@theme/theme.module';
import { DestinationRoutingModule, routedComponents } from './destination-routing.module';

@NgModule({
  imports: [
    ThemeModule,
    MatInputModule, MatDatepickerModule, MatExpansionModule, MatIconModule, MatFormFieldModule, MatNativeDateModule, 
    DestinationRoutingModule,
    NguiAutoCompleteModule.forRoot(),
    Ng2SmartTableModule,
    NgSelectModule,
    NgxMaskModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCpVhQiwAllg1RAFaxMWSpQruuGARy0Y1k',
      libraries: ['places'],
    }),
    AgmDirectionModule,
    NgxDatatableModule
  ],
  declarations: [
    ...routedComponents
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pl-PL'},
  ],
})
export class DestinationModule { }

