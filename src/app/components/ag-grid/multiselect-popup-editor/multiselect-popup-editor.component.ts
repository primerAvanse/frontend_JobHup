import { AfterViewInit, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { ListItem, getCSVFromListItemArray, getSelectedItemsFromCSV } from 'src/app/models/Shared/List-item';



@Component({
  // tslint:disable-next-line: component-selector
  selector: 'multiselect-popup-cell',
  templateUrl: './multiselect-popup-editor.component.html',
  styleUrls: ['./multiselect-popup-editor.component.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class MultiselectPopupEditor  implements ICellEditorAngularComp, AfterViewInit{
  private params: any;
  multiselectForm: FormGroup;
  options: ListItem[];
  get multiselection(): string {
   return getCSVFromListItemArray(this.options, this.multiselectForm.get('multiselection').value);
  }

  set multiselection(value: string) {
    const multiselection = getSelectedItemsFromCSV(this.options, value);
    this.multiselectForm.patchValue({...this.multiselectForm.value, multiselection});
  }

  constructor(private fb: FormBuilder) {
    this.multiselectForm = this.fb.group({
      multiselection: [{value: [], disabled: false}],
    });
  }

  ngAfterViewInit() {
    this.openOnStart();
  }

  agInit(params: any): void {
    this.params = params;
    this.options = params.options;
    this.multiselection = params.value;
  }

  getValue(): any {
    return this.multiselection;
  }

  isPopup(): boolean {
    return true;
  }


  onKeyDown(event): void {
    const key = event.which || event.keyCode;
    if (key === 13 ||  key === 38 ||  key === 40) { // Enter, up, down
      event.stopPropagation();  // Para poder seleccionar con enter y que no se cierre
    }
    if (event.ctrlKey && key === 81) { // ctrl + q
        this.onAccept();
    }
  }

  onAccept() {
    this.params.api.stopEditing();
  }

  private openOnStart() {
    window.setTimeout(() => {
      const ngSelectContainer: any = document.querySelector('.ng-select-container');
      ngSelectContainer.dispatchEvent(new Event('mousedown'));
    });
  }
}
