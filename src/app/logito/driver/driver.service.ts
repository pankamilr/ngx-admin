import {LogitoService} from './../logito.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, map, tap} from 'rxjs/operators';

import {Driver} from './driver.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DriverService {

    constructor(
        private http: HttpClient,
        private logitoService: LogitoService
    ) { }
    
    driversUrl: string = this.getLogito().baseUrl + "/drivers";
    
    getLogito() {
        return this.logitoService;
    }
    
    getDriverForm() {
        return this.getLogito().getDriverForm();
    }
    
    getDrivers() {
        return this.http.get(this.driversUrl, httpOptions)
            .map((res: Response) => { console.log(res); })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }    
    
    getDriverById (id) {
        return this.http.get(this.driversUrl + "/" + id, httpOptions).pipe(
          tap((hero: Driver) => {}),
          catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }
    
    createDriver (hero: Driver): Observable<Driver> {            
        return this.http.post<Driver>(this.driversUrl, hero, httpOptions).pipe(
          tap((hero: Driver) => {
              this.getLogito().showToast('success', 'Sukces!', 'Kierowca ' + hero.name + " dodany.");
          }),
          catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }
    
    updateDriver (hero: Driver): Observable<Driver> {            
        return this.http.put<Driver>(this.driversUrl + "/" + hero.id, hero, httpOptions).pipe(
          tap((hero: Driver) => {
              this.getLogito().showToast('success', 'Aktualizacja!', 'Kierowca ' + hero.name + " zaktualizowany.");
          }),
          catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }
    
    deleteDriver (hero: Driver): Observable<Driver> {            
        return this.http.delete<Driver>(this.driversUrl + "/" + hero.id, httpOptions).pipe(
          tap((hero: Driver) => {
              this.getLogito().showToast('success', 'Sukces!', 'Kierowca ' + hero.name + " został usunięty z listy.");
          }),
          catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }
}