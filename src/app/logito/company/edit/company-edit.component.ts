import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";

import { CompanyService } from './../company.service';
import { Company } from './../company.model';

@Component({
  selector: 'company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss'],
})
export class CompanyEditComponent implements OnInit {
  
    detailsForm: FormGroup;
    companyId: string;
    company: any;
    countries: any;
    
    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private companyService: CompanyService,
        private formBuilder: FormBuilder
      ) {
        this.detailsForm = companyService.getCompanyForm();
    }
    
    ngOnInit(){
        if(this.route.snapshot.params['id']) {
            this.companyId = this.route.snapshot.params['id'];
            this.companyService.getCompanyById(this.companyId).subscribe((hero: Company) => {
                this.company = hero;
                this.detailsForm.patchValue(hero);
            });

        }
        this.companyService.getLogito().getDestinationCountries().subscribe((countries) => {
            this.countries = countries;
        });
    }
    
    onSubmitEditCompany(company: Company) {
        if(company.id) {
            this.companyService.updateCompany(company).subscribe((newHeroWithId) => {   
            }, (response) => { });
        } else {
            this.companyService.createCompany(company).subscribe((newHeroWithId) => {
                this.router.navigate(['companies']);
            }, (response) => { });
        }
    }
    
    onSubmitDeleteCompany(company: Company) {
        this.companyService.deleteCompany(company).subscribe((newHeroWithId) => {
            this.router.navigate(['companies']);
        }, (response) => { });
    }
    
    onCountrySelected(country) {
        this.detailsForm.patchValue({country_code: country.code});
    }
    
}
