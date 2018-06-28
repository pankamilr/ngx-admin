import {LogitoService} from './../logito.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, map, tap} from 'rxjs/operators';

import {Destination} from './destination.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class DestinationService {

    constructor(
        private http: HttpClient,
        private logitoService: LogitoService
    ) { }
    
    destinationsUrl: string = this.getLogito().baseUrl + "/destination";
    
    getLogito() {
        return this.logitoService;
    }
    
    getDestinationForm() {
        return this.getLogito().getDestinationForm();
    }
    
    getDestination() {
        return this.http.get(this.destinationsUrl, httpOptions)
            .map((res: Response) => { console.log(res); })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }    
    
    getDestinationById (id) {
        return this.http.get(this.destinationsUrl + "/" + id, httpOptions).pipe(
          tap((hero: Destination) => {}),
          catchError((error: any) => Observable.throw(error || 'Server error'))
        );
    }
    
    createDestination (hero: Destination): Observable<Destination> {            
        return this.http.post<Destination>(this.destinationsUrl, hero, httpOptions).pipe(
          tap((hero: Destination) => {
              this.getLogito().showToast('success', 'Sukces!', 'Kierowca ' + hero.name + " dodany.");
          }),
          catchError((err) => {
                this.getLogito().handleError(err);            
                return Observable.throw(err);
            })
        );
    }
    
    updateDestination (hero: Destination): Observable<Destination> {            
        return this.http.put<Destination>(this.destinationsUrl + "/" + hero.id, hero, httpOptions).pipe(
          tap((hero: Destination) => {
              this.getLogito().showToast('success', 'Aktualizacja!', 'Kierowca ' + hero.name + " zaktualizowany.");
          }),
          catchError((err) => {
                this.getLogito().handleError(err);            
                return Observable.throw(err);
            })
        );
    }
    
    deleteDestination (hero: Destination): Observable<Destination> {            
        return this.http.delete<Destination>(this.destinationsUrl + "/" + hero.id, httpOptions).pipe(
          tap((hero: Destination) => {
              this.getLogito().showToast('success', 'Sukces!', 'Kierowca ' + hero.name + " został usunięty z listy.");
          }),
          catchError((err) => {
                this.getLogito().handleError(err);            
                return Observable.throw(err);
            })
        );
    }
}