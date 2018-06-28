import {LogitoService} from './../logito.service';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, map, tap} from 'rxjs/operators';

import {Client} from './client.model';
import {Direction} from './direction.model';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class ClientService {

    constructor(
        private http: HttpClient,
        private logitoService: LogitoService
    ) { }
    
    clientsUrl: string = this.getLogito().baseUrl + "/clients";
    directionsUrl: string = this.getLogito().baseUrl + "/direction"
    
    getLogito() {
        return this.logitoService;
    }
    
    sayHello() {
        this.logitoService.showToast('success', 'Hello', 'Have a nice day');
    }
    
    getClientForm() {
        return this.getLogito().getClientForm();
    }
    
    getClientDirectionForm(clientId: any) {
        return this.getLogito().getClientDirectionForm(clientId);
    }
    
    getClients() {
        return this.http.get(this.clientsUrl, httpOptions)
            .map((res: Response) => { console.log(res); })
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }    
    
    getClientById (id) {
        return this.http.get(this.clientsUrl + "/" + id, httpOptions).pipe(
          tap((hero: Client) => {}),
          catchError((err) => {
                this.getLogito().handleError(err);            
                return Observable.throw(err);
            })
        );
    }
    
    getClientDirections (id) {
        return this.http.get(this.clientsUrl, httpOptions).pipe(
          tap((hero: Client) => console.log(`fetched hero w/ id=${hero.id}`)),
          catchError((err) => {
                this.getLogito().handleError(err);            
                return Observable.throw(err);
            })
        );
    }
    
    addDirection (hero: Direction): Observable<Direction> {            
        return this.http.post<Direction>(this.directionsUrl, hero, httpOptions).pipe(
          tap((hero: Direction) => {
              this.getLogito().showToast('success', 'Sukces!', 'Kierunek dodany.');
          }),
          catchError((err) => {
                this.getLogito().handleError(err);            
                return Observable.throw(err);
            })
        );
    }
    
    deleteDirection (hero: Direction): Observable<Direction> {        
        return this.http.delete<Direction>(this.directionsUrl + "/" + hero.id, httpOptions).pipe(
          tap((hero: Direction) => {
              this.getLogito().showToast('success', 'Sukces!', 'Klient został usunięty.');
          }),
          catchError((err) => {
                this.getLogito().handleError(err);            
                return Observable.throw(err);
            })
        );
    }   
     
    updateDirection (hero: Direction): Observable<Direction> {            
        return this.http.put<Direction>(this.directionsUrl + "/" + hero.id, hero, httpOptions).pipe(
          tap((hero: Direction) => {
              this.getLogito().showToast('success', 'Aktualizacja!', 'Kierunek został zaktualizowany.');
          }),
          catchError((err) => {
                this.getLogito().handleError(err);            
                return Observable.throw(err);
            })
        );
    }
    
    createClient (hero: Client): Observable<Client> {            
        return this.http.post<Client>(this.clientsUrl, hero, httpOptions).pipe(
          tap((hero: Client) => {
              this.getLogito().showToast('success', 'Sukces!', 'Klient ' + hero.name + " " + hero.surname + " dodany.");
          }),
          catchError((err) => {
                this.getLogito().handleError(err);            
                return Observable.throw(err);
            })
        );
    }
    
    updateClient (hero: Client): Observable<Client> {            
        return this.http.put<Client>(this.clientsUrl + "/" + hero.id, hero, httpOptions).pipe(
          tap((hero: Client) => {
              this.getLogito().showToast('success', 'Aktualizacja!', 'Klient ' + hero.name + " " + hero.surname + " zaktualizowany.");
          }),
          catchError((err) => {
                this.getLogito().handleError(err);            
                return Observable.throw(err);
            })
        );
    }
    
    deleteClient (hero: Client): Observable<Client> {            
        return this.http.delete<Client>(this.clientsUrl + "/" + hero.id, httpOptions).pipe(
          tap((hero: Client) => {
              this.getLogito().showToast('success', 'Sukces!', 'Klient ' + hero.name + " " + hero.surname + " został usunięty z listy.");
          }),
          catchError((err) => {
                this.getLogito().handleError(err);            
                return Observable.throw(err);
            })
        );
    }
}