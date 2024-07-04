import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-error-messages-container',
  templateUrl: './error-messages-container.component.html',
  styleUrls: ['./error-messages-container.component.scss'],
})
export class ErrorMessagesContainerComponent implements OnInit {
  @Input() control: FormControl;
  @Input() isAsync: false;
  @Input() customClass = '';
  constructor() {}

  get errorMessage() {
    if (this.isAsync) {
      for (const propertyName in this.control.errors) {
        if (
          this.control.errors.hasOwnProperty(propertyName) &&
          !this.control.valid &&
          this.control.dirty
        ) {
          return CustomValidators.getAsyncValidatorErrorMessage(
            propertyName,
            this.control.errors[propertyName]
          );
        }
      }
      return null;
    } else {
      for (const propertyName in this.control.errors) {
        if (
          this.control.errors.hasOwnProperty(propertyName) &&
          !this.control.valid &&
          this.control.touched
        ) {
          return CustomValidators.getValidatorErrorMessage(
            propertyName,
            this.control.errors[propertyName]
          );
        }
      }
    }

    return null;
  }

  ngOnInit(): void {}
}
