import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  // mongod --dbpath data/db

  private olympicWinnerURL = 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinnersSmall.json';

  constructor(private http: HttpClient) { }


  getData(): Observable<any> {
    return this.http.get<Observable<OlympicData[]>>(this.olympicWinnerURL);
  }


}


export interface OlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}
