import { Component, EventEmitter, Input, OnInit, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-multi-select',
  templateUrl: './multi-select.component.html',
  styleUrls: ['./multi-select.component.scss'],
})
export class MultiSelectComponent implements OnInit, ControlValueAccessor {
  disabled: boolean;
  selectedValues = [];
  @Input() placeHolder: string;
  @Input() optionItems: any[];
  @Input() clearable = false;
  @Input() showFooter = false;
  @Input() showSelectAll = true;
  @Output() changeEvent: EventEmitter<any[]> = new EventEmitter();
  @Output() acceptEvent: EventEmitter<void> = new EventEmitter();
  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {}

  toggleCheckAll(event: any) {
    event.stopPropagation();
    if (event.currentTarget.checked) {
      this.selectAllItems();
    } else {
      this.unselectAllItems();
    }
  }
  onChange(event) {}

  onTouched() {}

  onSelectionChange(selectedItems: any[]) {
    if (Array.isArray(selectedItems)) {
      this.changeEvent.emit(selectedItems);
      const newList = selectedItems.map((x) => x.id);
      this.selectedValues = [...newList];
      this.onChange([...newList]);
      this.onTouched();
    }
  }

  writeValue(obj: any): void {
    this.selectedValues = [...obj];
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onAccept() {
    this.acceptEvent.emit();
  }

  private selectAllItems() {
    const newList = this.optionItems.map((x) => x.id);
    this.selectedValues = [...newList];
    this.onChange([...newList]);
    this.changeEvent.emit([...this.optionItems]);
  }

  private unselectAllItems() {
    this.selectedValues = [];
    this.onChange([]);
    this.changeEvent.emit([]);
  }
}
