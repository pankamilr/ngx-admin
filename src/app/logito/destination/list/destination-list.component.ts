import {Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from '@angular/common/http';
import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import { Observable } from 'rxjs/Observable';
import {MatDatepickerInputEvent, MatDatepicker} from '@angular/material';
import { animate, state, style, transition, trigger } from '@angular/animations';

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs/observable/of";


import {DestinationService} from './../destination.service';

@Component({
    selector: 'logito-driver-list',
    templateUrl: './destination-list.component.html',
    styleUrls: ['./destination-list.component.scss'],
    animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class DestinationListComponent implements OnInit, AfterViewInit {

    displayedColumns = ['position', 'date', 'weight'];
//    dataSource = new ExampleDataSource();
    dataSource = LessonsDataSource;
//    dataSource: any;
    rows: any;
    isExpansionDetailRow = (i: number, row: Object) => row.hasOwnProperty('detailRow');
    expandedElement: any;
    
    constructor(
        private http:HttpClient,
        private router:Router,
        private service: DestinationService
    ) {
        //this.service.getDestination().subscribe((companies) => {
        //    const rowss = [];
        //    companies.forEach(element => rowss.push(element, { detailRow: true, element }));
        //    this.rows = Observable.of(rowss);
//            this.rows = companies;
        //});
        
    }
    
    ngAfterViewInit() {        
    }

    ngOnInit() {
    }
    
    destinationDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
        console.log(event);
    }

    onSaveConfirm(event) {
        this.router.navigate(['/destinations/edit', event.data.id]);
    }

    onCreate(event) {
        this.router.navigate(['/destinations/add']);
    }
}


export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const data: Element[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

/**
 * Data source to provide what data should be rendered in the table. The observable provided
 * in connect should emit exactly the data that should be rendered by the table. If the data is
 * altered, the observable should emit that new set of data on the stream. In our case here,
 * we return a stream that contains only one set of data that doesn't change.
 */
export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    const rows = [];
    data.forEach(element => rows.push(element, { detailRow: true, element }));
    return Observable.of(rows);
  }

  disconnect() { }
}
export class LessonsDataSource implements DataSource<any> {

    private lessonsSubject = new BehaviorSubject<any>([]);

    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private destService: DestinationService) {

    }

    loadLessons(courseId:number,
                filter:string,
                sortDirection:string,
                pageIndex:number,
                pageSize:number) {

        this.loadingSubject.next(true);

        this.destService.getDestination().pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe(lessons => this.lessonsSubject.next(lessons));

    }

    connect(collectionViewer: CollectionViewer): Observable<any> {
        console.log("Connecting data source");
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

}