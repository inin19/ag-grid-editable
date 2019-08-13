import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-numeric-editor-cell',
  template: `
    <input #i  (keypress)="onKeyPress($event)" (keydown)="onKeyDown($event)" [value]="params.value"/>
  `
})
export class NumericEditorComponent implements AfterViewInit {
  @ViewChild('i', { static: false }) textInput: ElementRef;
  params: any;

  agInit(params: any): void {
    this.params = params;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.textInput.nativeElement.focus();
    });
  }

  getValue() {
    return this.textInput.nativeElement.value;
  }

  onKeyPress(event: any) {
    if (!isNumeric(event)) {
      event.preventDefault();
    }

    function isNumeric(ev: any) {
      return /\d/.test(ev.key);
    }
  }

  onKeyDown(event: any) {
    // key navigate
    if (event.keyCode === 39 || event.keyCode === 37) {
      event.stopPropagation();
    }
  }
}
