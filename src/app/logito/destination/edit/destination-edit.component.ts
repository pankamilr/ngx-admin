import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, FormGroupDirective } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/observable/of';
import { CompleterService, CompleterData } from 'ng2-completer';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

import { DestinationService } from './../destination.service';
import { Destination, Location } from './../destination.model';
import {Client} from './../../client/client.model';

@Component({
  selector: 'destination-edit',
  templateUrl: './destination-edit.component.html',
  styleUrls: ['./driver-edit.component.scss'],
})
export class DestinationEditComponent implements OnInit {
      
    destinationForm: FormGroup;
    driver: any;
    client: Client;
    destinationStart: any;
    destinationEnd: any;
    companies: any;
    countries: any;
    drivers: any;
    destinationNextButtonText: string = "Dalej";
    step: number = 0;
    searchedLocation: Location = new Location();
    origin: any;
    destination: any;
    public dir = undefined;
    
  updateLocation(event: Location) {
    this.searchedLocation = new Location(event.latitude, event.longitude);
  }
  
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private destinationService: DestinationService,
        private formBuilder: FormBuilder,
        private http: Http
      ) {
        this.origin = { latitude: 24.799448, longitude: 120.979021 };
        this.destination = { latitude: 24.799524, longitude: 120.975017 };
        this.dir = {
    origin: { lat: 24.799448, lng: 120.979021 },
    destination: { lat: 24.799524, lng: 120.975017 }
  }
    }
    
    ngOnInit(){
        if(this.route.snapshot.params['id']) {
//            this.driverId = this.route.snapshot.params['id'];
//            this.destinationService.getDriverById(this.driverId).subscribe((hero: Destination) => {
//                this.driver = hero;
//                this.destinationForm.patchValue(hero);
//            });
        }
        this.destinationForm = this.destinationService.getDestinationForm();
        this.destinationService.getLogito().getCompanies().subscribe((companies) => {
            this.companies = companies;
        });
        this.destinationService.getLogito().getDestinationCountries().subscribe((countries) => {
            this.countries = countries;
        });
        this.destinationService.getLogito().getDrivers().subscribe((drivers) => {
            this.drivers = drivers;
        });
    }
    
    searchClients = (keyword: any): Observable<any[]> => {
        let url: string = this.destinationService.getLogito().baseUrl + '/clients/search?surname='+keyword+'&phone='+keyword;
        if (keyword) {
          return this.http.get(url)
            .map(res => {
              return res.json();
            })
        } else {
          return Observable.of([]);
        }
    }
    
    onAutocompleteSubmit(client: Client) { }
    onCompanySelected(company) { }
    
    destinationDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
        console.log(event);
    }
    /**
     * 
     */
    onSubmitDestination(form) {
        console.log(form);
        this.destinationService.createDestination(form.value).subscribe((newHeroWithId) => { }, (response) => { });
    }

    setStep(index: number) {
      this.step = index;
    }

    prevStep() {
      this.step--;
    }
    
    nextStep(event) {
        this.step++;
        this.dir.origin = { lat: 25.038487, lng: 121.580187 };
        if(this.step == 3) {
            this.destinationNextButtonText = "Zapisz przejazd";
        }
        console.log(event);
    }
    
    onDestinationCountrySelected(destination) {
        console.log(destination);
    }
}
