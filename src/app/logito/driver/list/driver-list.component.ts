import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import {ServerDataSource} from 'ng2-smart-table';

import {DriverService} from './../driver.service';


@Component({
    selector: 'logito-driver-list',
    styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    nb-card-body { 
        padding: 0; 
    }
  `],
    templateUrl: './driver-list.component.html',
})
export class DriverListComponent implements OnInit, AfterViewInit {
    
    source: ServerDataSource;
    
    constructor(
        private http: HttpClient,
        private router: Router,
        private driverService: DriverService
    ) {
        this.source = new ServerDataSource(http, {endPoint: this.driverService.driversUrl});
    }
    
    ngAfterViewInit() {    
    }
    
    ngOnInit() {
    }
    
    settings = {
        add: {
            addButtonContent: '<i class="nb-plus"></i>',
            createButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmCreate: true,
        },
        edit: {
            editButtonContent: '<i class="nb-edit"></i>',
            saveButtonContent: '<i class="nb-checkmark"></i>',
            cancelButtonContent: '<i class="nb-close"></i>',
            confirmSave: true,
        },
        delete: {
            deleteButtonContent: '<i class="nb-trash"></i>',
            confirmDelete: true,
        },
        actions: {
            edit: true,
            delete: true,
            add: true,
        },
        columns: {
            name: {
                title: 'Imię',
                type: 'string',
            },
            surname: {
                title: 'Nazwisko',
                type: 'string',
            },
            phone: {
                title: 'Telefon',
                type: 'string',
            },
        },
        mode: 'external',
    };    
    
    onSaveConfirm(event) {
        this.router.navigate(['/drivers/edit', event.data.id]);
    }
    
    onCreate(event) {
        this.router.navigate(['/drivers/add']);
    }
}

