import { Component, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';


@Component({
  selector: 'app-link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss'],
})

export class LinkButtonComponent
  implements ICellRendererAngularComp, OnDestroy {
  params;
  label: string;
  icon:string = 'info';
  iconText:string = 'Link';
  isVisible: boolean = true;
  getLabelFunction: any;
  constructor() {}

  ngOnDestroy(): void {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }

  refresh(params: any): boolean {
    return true;
  }

  agInit(params): void {
    this.params = params;
    this.icon = this.params.icon || this.icon;
    this.iconText = this.params.iconText || this.iconText;
  }

  onClick($event) {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
        event: $event,
        rowData: this.params.node.data,
        label: this.label,
        icon: this.icon,
        iconText: this.iconText,
        // ...something
      };
      this.params.onClick(params);
    }
  }
}
