import {LogitoService} from './../logito.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, map, tap} from 'rxjs/operators';

import {Company} from './company.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class CompanyService {

    constructor(
        private http: HttpClient,
        private logitoService: LogitoService
    ) { }
    
    companiesUrl: string = this.getLogito().baseUrl + "/companies";
    
    getLogito() {
        return this.logitoService;
    }
    
    sayHello() {
        this.logitoService.showToast('success', 'Hello', 'Have a nice day');
    }
    
    getCompanyForm() {
        return this.getLogito().getCompanyForm();
    }
    
    getCompanies() {
        return this.http.get(this.companiesUrl, httpOptions)
            .map((res: Response) => { console.log(res); })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }    
    
    getCompanyById (id) {
        return this.http.get(this.companiesUrl + "/" + id, httpOptions).pipe(
          tap((hero: Company) => {}),
          catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }
    
    createCompany (hero: Company): Observable<Company> {            
        return this.http.post<Company>(this.companiesUrl, hero, httpOptions).pipe(
          tap((hero: Company) => {
              this.getLogito().showToast('success', 'Sukces!', 'Kontrahent ' + hero.name + " dodany.");
          }),
          catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }
    
    updateCompany (hero: Company): Observable<Company> {            
        return this.http.put<Company>(this.companiesUrl + "/" + hero.id, hero, httpOptions).pipe(
          tap((hero: Company) => {
              this.getLogito().showToast('success', 'Aktualizacja!', 'Kontrahent ' + hero.name + " zaktualizowany.");
          }),
          catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }
    
    deleteCompany (hero: Company): Observable<Company> {            
        return this.http.delete<Company>(this.companiesUrl + "/" + hero.id, httpOptions).pipe(
          tap((hero: Company) => {
              this.getLogito().showToast('success', 'Sukces!', 'Kontrahent ' + hero.name + " został usunięty z listy.");
          }),
          catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }
}