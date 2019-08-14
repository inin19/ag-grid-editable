import { Component, OnInit, ViewChild } from '@angular/core';
import { GridOptions, ValueFormatterParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { MockServerService } from './mock-server.service';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-rxjs-by-row',
  templateUrl: './rxjs-by-row.component.html',
  styleUrls: ['./rxjs-by-row.component.scss']
})
export class RxjsByRowComponent implements OnInit {
  gridOptions: GridOptions;
  initialRowDataLoad$: Observable<any[]>;
  rowDataUpdates$: Observable<any[]>;

  @ViewChild('agGrid', { static: true }) agGrid: AgGridAngular;


  constructor(private mockServerService: MockServerService) {
    this.initialRowDataLoad$ = this.mockServerService.initialLoad();
    this.rowDataUpdates$ = this.mockServerService.byRowupdates();
  }

  ngOnInit() {
    // this.initialRowDataLoad$.subscribe(data => {
    //   console.log(data);
    // });


    this.gridOptions = {
      enableRangeSelection: true,
      columnDefs: this.createColumnDefs(),
      getRowNodeId: (data) => data.code,
      onGridReady: () => {
        this.initialRowDataLoad$.subscribe(rowData => {
          console.log(rowData[0]);

          if (this.gridOptions.api) {
            this.gridOptions.api.setRowData(rowData);
          }


          // now listen for updates
          // we process the updates with a transaction - this ensures that only the changes
          // rows will get re-rendered, improving performance
          this.rowDataUpdates$.subscribe(updates => {
            if (this.gridOptions.api) {
              // can be null when tabbing between the examples
              this.gridOptions.api.updateRowData({
                update: updates,
              });
            }
          });


        });
      },
      onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
      },
    };

  }


  private createColumnDefs() {
    return [
      { headerName: 'Code', field: 'code', width: 70, resizable: true },
      { headerName: 'Name', field: 'name', width: 280, resizable: true },
      {
        headerName: 'Bid',
        field: 'bid',
        width: 100,
        resizable: true,
        cellClass: 'cell-number',
        valueFormatter: this.numberFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
      },
      {
        headerName: 'Mid',
        field: 'mid',
        width: 100,
        resizable: true,
        cellClass: 'cell-number',
        valueFormatter: this.numberFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
      },
      {
        headerName: 'Ask',
        field: 'ask',
        width: 100,
        resizable: true,
        cellClass: 'cell-number',
        valueFormatter: this.numberFormatter,
        cellRenderer: 'agAnimateShowChangeCellRenderer',
      },
      {
        headerName: 'Volume',
        field: 'volume',
        width: 100,
        resizable: true,
        cellClass: 'cell-number',
        cellRenderer: 'agAnimateSlideCellRenderer',
      },
    ];
  }

  numberFormatter(params: ValueFormatterParams) {
    if (typeof params.value === 'number') {
      return params.value.toFixed(2);
    } else {
      return params.value;
    }
  }

}
