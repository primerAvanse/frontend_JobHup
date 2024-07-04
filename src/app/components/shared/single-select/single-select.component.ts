import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'app-single-select',
  templateUrl: './single-select.component.html',
  styleUrls: ['./single-select.component.scss'],
})
export class SingleSelectComponent implements OnInit, ControlValueAccessor {
  disabled: boolean;
  selectedValue: any;
  @Input() placeHolder: string;
  @Input() clearable = false;
  @Input() optionItems: any[];
  @Output() changeEvent: EventEmitter<any> = new EventEmitter();
  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void {}

  onChange(event) {}

  onTouched() {}

  onSelectionChange(selectedItem: any) {
    this.changeEvent.emit(selectedItem);
    this.selectedValue = selectedItem.id;
    this.onChange(selectedItem.id);
    this.onTouched();
  }

  writeValue(obj: any): void {
    this.selectedValue = obj;
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
}
