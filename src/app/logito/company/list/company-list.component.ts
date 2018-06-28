import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { HttpClient } from '@angular/common/http';
import {ServerDataSource} from 'ng2-smart-table';

import {CompanyService} from './../company.service';


@Component({
    selector: 'logito-company-list',
    styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
    nb-card-body { 
        padding: 0; 
    }
  `],
    templateUrl: './company-list.component.html',
})
export class CompanyListComponent implements OnInit {
    
    source: ServerDataSource;
    
    constructor(
        private http: HttpClient,
        private router: Router,
        private companyService: CompanyService
    ) {
        this.source = new ServerDataSource(http, {endPoint: this.companyService.companiesUrl});
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
                title: 'Nazwa',
                type: 'string',
            },
            nip: {
                title: 'NIP',
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
//        hideSubHeader: true,
    };    
    
    onSaveConfirm(event) {
        console.log(event.data);
        this.router.navigate(['/companies/edit', event.data.id]);
    }
    
    onCreate(event) {
        this.router.navigate(['/companies/add']);
    }
}

