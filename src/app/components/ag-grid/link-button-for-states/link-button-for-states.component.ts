import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';


@Component({
  selector: 'app-link-button-for-states',
  templateUrl: './link-button-for-states.component.html',
  styleUrls: ['./link-button-for-states.component.scss'],
})
export class LinkButtonForStatesComponent
  implements ICellRendererAngularComp, OnDestroy {
  private params: any;
  label: string;
  getLabelFunction: any;
  constructor() {}

  ngOnDestroy(): void {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }

  refresh(params: any): boolean {
    return true;
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.label = this.params.label;
    this.getLabelFunction = this.params.getLabelFunction;
    if (this.getLabelFunction && this.getLabelFunction instanceof Function) {
      this.label = this.getLabelFunction(params.data);
    }
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data,
        label: this.label,
        // ...something
      };
      this.params.onClick(params);
    }
  }
}
