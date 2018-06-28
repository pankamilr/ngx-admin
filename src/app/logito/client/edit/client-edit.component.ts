import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import {ClientDirectionComponent} from './../direction/client-direction.component';
import {NbTabComponent} from '@nebular/theme/components/tabset/tabset.component';
import { ClientService } from './../client.service';
import { Client } from './../client.model';
import {Company} from './../../company/company.model';

@Component({
  selector: 'client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss'],
})
export class ClientEditComponent implements OnInit {
    @ViewChild('directionFormTab') directionFormTab:NbTabComponent; 
    @ViewChild('directionListTab') directionListTab:NbTabComponent; 
    @ViewChild(ClientDirectionComponent) directionForm:ClientDirectionComponent;
    detailsForm: FormGroup;
    clientId: string;
    client: Client;
    companies: Company[];
    isClientPrivate: boolean = false;
    
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private clientService: ClientService,
        private formBuilder: FormBuilder
      ) {
        this.detailsForm = clientService.getClientForm();
    }
    
    ngOnInit(){
        this.clientId = this.route.snapshot.params['id'];
        if(this.clientId) {
            this.clientService.getClientById(this.clientId).subscribe((hero: Client) => {
                this.client = hero;
                this.detailsForm.patchValue(hero);
                this.isClientPrivate = hero.type == 1 ? true : false;
            });
        }
        this.clientService.getLogito().getCompanies().subscribe((companies: Company[]) => {
            this.companies = companies;
        });
    }
    
    onSubmitEditClient(client: Client) {
        if(client.id) {
            this.clientService.updateClient(client).subscribe((newHeroWithId) => {   
            }, (response) => { });
        } else {
            this.clientService.createClient(client).subscribe((newHeroWithId) => {   
            }, (response) => { });
        }
    }
    
    onSubmitDeleteClient(client) {
        this.clientService.deleteClient(client).subscribe((newHeroWithId) => {
            this.router.navigate(['clients']);
        }, (response) => { });
    }
    
    onEditDirection(direction) {
        this.directionListTab.active = false;
        this.directionFormTab.active = true;
        this.directionFormTab.tabTitle = "Edytuj kierunek";
        this.directionForm.directionForm.patchValue(direction);
        
    }
    
    onDeleteDirection(direction) {
        this.clientService.deleteDirection(direction).subscribe((direction) => {
        }, (response) => { });
    }
    
    onChangeDirectionTab(tab: NbTabComponent) {
        if(tab.tabTitle == 'Kierunki klienta' && this.directionForm) {
            this.directionFormTab.tabTitle = "Dodaj nowy kierunek";
            this.directionForm.directionForm.reset({ country_code: 'pl_PL', client_id: this.client.id });
        }
    }
    
    onSuccessDirectionSubmit(event) {
        this.directionFormTab.active = false;
        this.directionListTab.active = true;
        this.onChangeDirectionTab(this.directionListTab);
    }
  
}
