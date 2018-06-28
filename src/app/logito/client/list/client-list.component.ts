import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import {ServerDataSource} from 'ng2-smart-table';

import {ClientService} from './../client.service';


@Component({
    selector: 'logito-clients-list',
    styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    nb-card-body { 
        padding: 0; 
    }
  `],
    templateUrl: './client-list.component.html',
})
export class ClientListComponent implements OnInit {
    
    source: ServerDataSource;
    
    constructor(
        private http: HttpClient,
        private router: Router,
        private clientService: ClientService
    ) {
        this.source = new ServerDataSource(http, {endPoint: this.clientService.clientsUrl});
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
            delete: false,
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
            email: {
                title: 'E-mail',
                type: 'string',
            },
        },
        mode: 'external',
        //    hideSubHeader: true,
    };    
    
    onSaveConfirm(event) {
        this.router.navigate(['/clients/edit', event.data.id]);
    }
    
    onCreateConfirm(event) {
        this.router.navigate(['/clients/add']);
    }
}

