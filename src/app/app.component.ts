import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NumberFormatterComponent } from './custom-components/number-formatter.component';
import { NumericEditorComponent } from './custom-components/numeric-editor.component';
import { RangeFilterComponent } from './custom-components/range-filter.component';


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
      cellEditor: 'numericEditorComponent',
      /* custom filter */

      filter: 'rangeFilterComponent'

    }
  ];

  frameworkComponents = {
    numberFormatterComponent: NumberFormatterComponent,
    numericEditorComponent: NumericEditorComponent,
    rangeFilterComponent: RangeFilterComponent,

  };

  rowData: any;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
  }

}
