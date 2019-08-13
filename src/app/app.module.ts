import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NumberFormatterComponent } from './custom-components/number-formatter.component';
import { NumericEditorComponent } from './custom-components/numeric-editor.component';
import { RangeFilterComponent } from './custom-components/range-filter.component';
import { RxjsByRowComponent } from './rxjs-component-example/rxjs-by-row.component';
import { MyAgGridComponent } from './my-ag-grid/my-ag-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    NumberFormatterComponent,
    NumericEditorComponent,
    RangeFilterComponent,
    RxjsByRowComponent,
    MyAgGridComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgGridModule.withComponents([
      NumberFormatterComponent,
      NumericEditorComponent,
      RangeFilterComponent
    ]),
    BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
