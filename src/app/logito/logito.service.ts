import { Input, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class LogitoService {
//    @Input() baseUrl: string = "https://logito.fajnydesign.pl/api";
    @Input() baseUrl: string = "http://logit-api.dv/api";
    @Input() countriesUrl: string = this.baseUrl + "/destination/countries";
    @Input() companiesUrl: string = this.baseUrl + "/companies";
    @Input() driversUrl: string = this.baseUrl + "/drivers";
    
    constructor(
        private toasterService: ToasterService,
        private formBuilder: FormBuilder,
        private http: HttpClient
        ) { } 
    
    /**
     * 
     */
    public getCompanyForm() {
        return this.formBuilder.group({
            'id':  '',
            'name':  ['', [Validators.required, Validators.minLength(2)]],
            'nip':  ['', [Validators.required, Validators.minLength(2)]],
            'address_1':     ['', [Validators.required]],
            'address_2':    '',
            'postcode':     ['', [Validators.required]],
            'city':     ['', [Validators.required]],
            'country':     ['', [Validators.required]],
            'country_code':     ['', [Validators.required]],
            'phone':    ['', [Validators.required]],
            'email':     ['', [Validators.pattern("[^ @]*@[^ @]*")]],
        });
    }   
    
    /**
     * 
     */
    public getClientForm() {
        return this.formBuilder.group({
            'id':  '',
            'surname':  ['', [Validators.required, Validators.minLength(2)]],
            'name':     ['', [Validators.required]],
            'phone':    ['', [Validators.required]],
            'type':     '',
            'email':     ['', [Validators.pattern("[^ @]*@[^ @]*")]],
            'company': '',
        });
    }   
    
    /**
     * 
     */
    public getDriverForm() {
        return this.formBuilder.group({
            'id':  '',
            'surname':  ['', [Validators.required, Validators.minLength(2)]],
            'name':     ['', [Validators.required]],
            'phone':    ['', [Validators.required]],
        });
    }   
    
    /**
     * 
     */
    public getClientDirectionForm(client: any) {
        return this.formBuilder.group({
            'id':  '',
            'client_id':  client ? client.id : false,
            'country': '',
            'country_code': 'pl_PL',
            'city': '',
            'postcode':     '',
            'address_1':     '',
            'address_2':     '',
        });
    }
    
    /**
     * 
     */
    public getDestinationForm() {
        return this.formBuilder.group({
            'id':  '',
            'destination_id':  '',
            'travel_time': '',
            'start': this.getClientDirectionForm(false),
            'end': this.getClientDirectionForm(false),
            'client': this.getClientForm(),
            'driver_id': '',
            'travel_date': ''
//            'driver': this.getDriverForm(),
        });
    }
    
    /**
     * 
     */
    public getCompanies() {
       return this.http.get(this.companiesUrl, httpOptions).pipe(
          tap((countries) => console.log(countries)),
          catchError((error: any) => Observable.throw(error || 'Server error'))
        ); 
    } 
    
    /**
     * 
     */
    public getDestinationCountries() {
       return this.http.get(this.countriesUrl, httpOptions).pipe(
          tap((countries) => console.log(countries)),
          catchError((error: any) => Observable.throw(error || 'Server error'))
        ); 
    } 
    
    /**
     * 
     */
    public getDrivers() {
       return this.http.get(this.driversUrl, httpOptions).pipe(
          tap((drivers) => console.log(drivers)),
          catchError((error: any) => Observable.throw(error || 'Server error'))
        ); 
    } 
    
    /**
     * 
     */
    public handleError(response) {
        if('error' in response) {
            for(let [key, value] of Object.entries(response.error.errors)) {
                this.showToast('error', 'Wystąpiły błędy', value[0]);
            }
        }
    } 
    
    /**
     * 
     */
    public showToast(type: string, title: string, body: string) {
//      this.config = new ToasterConfig({
//        positionClass: 'toast-bottom-full-width',
//        timeout: 4000,
//        newestOnTop: true,
//        tapToDismiss: true,
//        preventDuplicates: true,
//        animation: 'slideDown',
//        limit: 5,
//      });
      const toast: Toast = {
        type: type,
        title: title,
        body: body,
        timeout: 4000,
        showCloseButton: true,
        bodyOutputType: BodyOutputType.TrustedHtml,
      };
      this.toasterService.popAsync(toast);
    }
}
