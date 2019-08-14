import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid-community';
import { GridService, OlympicData } from './grid.service';

@Component({
  selector: 'app-my-ag-grid',
  templateUrl: './my-ag-grid.component.html',
  styleUrls: ['./my-ag-grid.component.scss']
})
export class MyAgGridComponent implements OnInit {

  gridOptions: GridOptions;

  columnDefs: any[];
  defaultColDef: any;
  groupDefaultExpanded: number;

  rowData: any;

  constructor(private gridService: GridService) {
    this.columnDefs = [
      { headerName: 'Athlete', field: 'athlete', width: 150, resizable: true },
      { headerName: 'Age', field: 'age', width: 90, resizable: true },
      { headerName: 'Country', field: 'country', width: 120, rowGroupIndex: 0 },
      { headerName: 'Year', field: 'year', width: 120 },
      { headerName: 'Date', field: 'date', width: 110 },
      { headerName: 'Sport', field: 'sport', width: 110 },
      { headerName: 'Gold', field: 'gold', width: 100 },
      { headerName: 'Silver', field: 'silver', width: 100 },
      { headerName: 'Bronze', field: 'bronze', width: 100 },
      { headerName: 'Total', field: 'total', width: 100 },
    ];

    this.defaultColDef = {
      sortable: true,
      filter: true
    };

  }

  ngOnInit() {


    this.gridOptions = {
      columnDefs: this.columnDefs,
      onRowClicked: (event) => { console.log('a row was clicked'); },
      onColumnResized: (event) => { console.log('a column was resized'); },
      onGridReady: (event) => { console.log('the grid is now ready'); },

    };

    this.rowData = this.gridService.getData();
  }


}
