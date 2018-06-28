import {Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {ServerDataSource} from 'ng2-smart-table';

import {DestinationService} from './../destination.service';


@Component({
    selector: 'logito-driver-list',
    styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    nb-card-body { 
        padding: 0; 
    }
    .ngx-datatable.scroll-vertical {
        height: 78vh;
    }
  `],
    templateUrl: './destination-list.component.html',
})
export class DestinationListComponent implements OnInit, AfterViewInit {

    @ViewChild('myTable') table: any;

    rows: any[] = [];
    expanded: any = {};
    timeout: any;

    source: ServerDataSource;

    constructor(
        private http: HttpClient,
        private router: Router,
        private destinationService: DestinationService,
        private cd: ChangeDetectorRef
    ) {
        this.source = new ServerDataSource(http, {endPoint: this.destinationService.destinationsUrl});
        this.fetch((data) => {
            this.rows = data;
        });
    }

    onPage(event) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            console.log('paged!', event);
        }, 100);
    }

    fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', this.destinationService.destinationsUrl);

        req.onload = () => {
            cb(JSON.parse(req.response));
        };

        req.send();
    }

    toggleExpandRow(row) {
        console.log('Toggled Expand Row!', row);
        this.table.rowDetail.toggleExpandRow(row);
    }

    onDetailToggle(event) {
        console.log('Detail Toggled', event);
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
        this.router.navigate(['/destinations/edit', event.data.id]);
    }

    onCreate(event) {
        this.router.navigate(['/destinations/add']);
    }
}

