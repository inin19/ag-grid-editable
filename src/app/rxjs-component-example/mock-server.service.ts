import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { cloneDeep } from 'lodash';


@Injectable({
  providedIn: 'root'
})
export class MockServerService {
  stocksUrl = 'https://rawgit.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/stocks.json';

  rowData: any[];
  constructor(private http: HttpClient) { }

  initialLoad(): any {
    return this.http.get<any[]>(this.stocksUrl)
      .pipe(
        map(data => data.slice(0, 200)),
        tap(data => this.backfillData(data))
      );
  }


  // provides randomised data updates to some of the rows
  // only returns the changed data rows
  byRowupdates(): any {
    return new Observable((observer) => {
      const interval = window.setInterval(() => {
        const changes = [];

        // make some mock changes to the data
        this.makeSomePriceChanges(changes);
        this.makeSomeVolumeChanges(changes);
        observer.next(changes);
      }, 1000);

      return () => window.clearInterval(interval);
    });

  }

  // provides randomised data updates to some of the rows
  // only all the row data (with some rows changed)
  allDataUpdates(): any {
    return new Observable((observer) => {
      const interval = window.setInterval(() => {
        const changes = [];

        // make some mock changes to the data
        this.makeSomePriceChanges(changes);
        this.makeSomeVolumeChanges(changes);

        // this time we don't care about the delta changes only
        // this time we return the full data set which has changed rows within it
        observer.next(cloneDeep(this.rowData));
      }, 1000);

      return () => window.clearInterval(interval);
    });
  }



  handleError(error: any): Observable<any> {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return throwError(errMsg);
  }


  /*
   * The rest of the code exists to create or modify mock data
   * it is not important to understand the rest of the example (i.e. the rxjs part of it)
   */
  backfillData(rowData: any[]): any {
    // the sample data has just name and code, we need to add in dummy figures
    rowData.forEach((dataItem) => {

      // have volume a random between 100 and 10,000
      dataItem.volume = Math.floor((Math.random() * 10000) + 100);

      // have mid random from 20 to 300
      dataItem.mid = (Math.random() * 300) + 20;
      this.setBidAndAsk(dataItem);
    });

    this.rowData = rowData;

    return cloneDeep(this.rowData);
  }

  makeSomePriceChanges(changes): any {
    // randomly update data for some rows
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(this.rowData.length * Math.random());

      const currentRowData = this.rowData[index];

      // change by a value between -1 and 2 with one decimal place
      const move = (Math.floor(30 * Math.random())) / 10 - 1;
      const newValue = currentRowData.mid + move;
      currentRowData.mid = newValue;

      this.setBidAndAsk(currentRowData);

      changes.push(currentRowData);
    }
  }

  makeSomeVolumeChanges(changes): any {
    for (let i = 0; i < 10; i++) {
      // pick a data item at random
      const index = Math.floor(this.rowData.length * Math.random());

      const currentRowData = this.rowData[index];

      // change by a value between -5 and 5
      const move = (Math.floor(10 * Math.random())) - 5;
      const newValue = currentRowData.volume + move;
      currentRowData.volume = newValue;

      changes.push(currentRowData);
    }
  }


  setBidAndAsk(dataItem): any {
    dataItem.bid = dataItem.mid * 0.98;
    dataItem.ask = dataItem.mid * 1.02;
  }
}
