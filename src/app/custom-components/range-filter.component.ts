import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { IFilterComp } from 'ag-grid-community';

@Component({
  selector: 'app-range-filter',
  template: `
  <form (submit)="onSubmit($event)">
    <input #i  name="filter" [value]="filter"/>
    <button>Apply</button>
  </form>
  `,
  styles: []
})
export class RangeFilterComponent implements OnInit, AfterViewInit {
  filter = '';
  @ViewChild('i', { static: false }) textInput: ElementRef;


  constructor() { }

  params: any;

  agInit(params: any): void {
    console.log('filter component agInit');
    this.params = params;
  }


  // getGui() {

  // }

  onSubmit(event: any) {
    event.preventDefault();
    const filter = event.target.elements.filter.value;

    if (this.filter !== filter) {
      this.filter = filter;
      /* notify the grid about the change */
      this.params.filterChangedCallback();

    }

  }

  isFilterActive() {
    return this.filter !== '';
  }

  doesFilterPass(params) {
    const filter = this.filter.split('-');
    const gt = Number(filter[0]);
    const lt = Number(filter[1]);
    const value = this.params.valueGetter(params.node);

    return value >= gt && value <= lt;
  }


  getModel() {
    return { filter: this.filter };
  }

  setModel(model) {
    this.filter = model ? model.filter : '';
  }

  ngOnInit() {
    console.log('filter compoent ngOnInit');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    });
  }
}
