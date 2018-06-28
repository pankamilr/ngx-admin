import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbMenuItem,
  NbMenuService,
  NbThemeService,
  NbSidebarService, } from '@nebular/theme';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/delay';

import { MENU_ITEMS } from './logito-menu';

@Component({
  selector: 'logito-pages',
  template: `
    <toaster-container></toaster-container>
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `
})
export class LogitoComponent implements OnInit, OnDestroy {

  menu = MENU_ITEMS;
  protected menuClick$: Subscription;
  
  constructor(
    protected menuService: NbMenuService,
    protected themeService: NbThemeService,
    protected bpService: NbMediaBreakpointsService,
    protected sidebarService: NbSidebarService
  ) {
        const isBp = this.bpService.getByName('is');
        this.menuClick$ = this.menuService.onItemSelect()
            .withLatestFrom(this.themeService.onMediaQueryChange())
            .delay(20)
            .subscribe(([item, [bpFrom, bpTo]]: [any, [NbMediaBreakpoint, NbMediaBreakpoint]]) => {
                if (bpTo.width <= isBp.width) {
                    this.sidebarService.collapse('menu-sidebar');
                }
            });
  }
  
  ngOnInit() {
  }
  
  ngOnDestroy() {
    this.menuClick$.unsubscribe();
  }
}
