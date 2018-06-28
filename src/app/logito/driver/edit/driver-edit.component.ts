import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { DriverService } from './../driver.service';
import { Driver } from './../driver.model';

@Component({
  selector: 'driver-edit',
  templateUrl: './driver-edit.component.html',
  styleUrls: ['./driver-edit.component.scss'],
})
export class DriverEditComponent implements OnInit {
  
    detailsForm: FormGroup;
    driverId: string;
    driver: any;
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private driverService: DriverService,
        private formBuilder: FormBuilder
      ) {
        this.detailsForm = driverService.getDriverForm();
    }
    
    ngOnInit(){
        if(this.route.snapshot.params['id']) {
            this.driverId = this.route.snapshot.params['id'];
            this.driverService.getDriverById(this.driverId).subscribe((hero: Driver) => {
                this.driver = hero;
                this.detailsForm.patchValue(hero);
            });

        }
    }
    
    onSubmitEditCompany(driver: Driver) {
        if(driver.id) {
            this.driverService.updateDriver(driver).subscribe((newHeroWithId) => {   
            }, (response) => { });
        } else {
            this.driverService.createDriver(driver).subscribe((newHeroWithId) => {
                this.router.navigate(['drivers']);
            }, (response) => { });
        }
    }
    
    onSubmitDeleteCompany(driver: Driver) {
        this.driverService.deleteDriver(driver).subscribe((newHeroWithId) => {
            this.router.navigate(['drivers']);
        }, (response) => { });
    }
    
}
