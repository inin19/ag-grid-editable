import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NumberFormatterComponent } from './custom-components/number-formatter.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ag-app-editable';

  columnDefs = [
    { headerName: 'Make', field: 'make' },
    { headerName: 'Model', field: 'model' },
    {
      headerName: 'Price', field: 'price', editable: true,
      /* specify custom cell renderer */
      cellRenderer: 'numberFormatterComponent',

    }
  ];

  frameworkComponents = {
    numberFormatterComponent: NumberFormatterComponent,
  };

  rowData: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
  }

}
