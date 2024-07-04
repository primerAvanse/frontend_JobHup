import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';




@Component({
  // tslint:disable-next-line: component-selector
  selector: 'boolean-cell',
  templateUrl: './boolean-editor.component.html',
  styleUrls: ['./boolean-editor.component.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class BooleanEditor implements ICellEditorAngularComp, AfterViewInit {
  params: any;
  value: any;

  @ViewChild('input', { read: ViewContainerRef }) public input: any;
  agInit(params: any): void {
    this.params = params;
  }


  getValue(): any {
    return this.params.value;
  }

  checkedHandler(event) {
    const checked = event.target.checked;
    const colId = this.params.column.colId;
    this.params.node.setDataValue(colId, checked);
    this.params.value = checked;
  }


  // dont use afterGuiAttached for post gui events - hook into ngAfterViewInit instead for this
  ngAfterViewInit() {
    window.setTimeout(() => {
      this.input.element.nativeElement.focus();
    });
  }
}
