import { Component, OnInit, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { ClientService } from './../client.service';
import { Client } from './../client.model';

@Component({
  selector: 'client-direction',
  templateUrl: './client-direction.component.html',
  styleUrls: ['./client-direction.component.scss'],
})
export class ClientDirectionComponent implements OnInit, AfterViewInit {
    @Input() client: Client;
    @Output() onSuccess = new EventEmitter<any>();
    directionForm: FormGroup;
    countries: any;
  
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private clientService: ClientService,
        private formBuilder: FormBuilder
      ) { }
    
    ngOnInit(){
        this.directionForm = this.clientService.getClientDirectionForm(this.client);
        this.clientService.getLogito().getDestinationCountries().subscribe((countries) => {
            this.countries = countries;
        });
    }
    
    ngAfterViewInit() { }
    
    
    onCountrySelected(country) {
        this.directionForm.patchValue({country_code: country.code});
    }
    
    onSubmitDirection(direction) {
        if(direction.id) {
            this.clientService.updateDirection(direction).subscribe((newDirection) => {
                this.directionForm.reset({ country_code: 'pl_PL', client_id: this.client.id });
                this.onSuccess.emit(newDirection);
            }, (response) => { });
        } else {
            this.clientService.addDirection(direction).subscribe((newDirection) => {
                this.client.directions.push(newDirection);
                this.directionForm.reset({ country_code: 'pl_PL', client_id: this.client.id });
                this.onSuccess.emit(newDirection);
            }, (response) => { });
            
        }
        
    }
  
}
