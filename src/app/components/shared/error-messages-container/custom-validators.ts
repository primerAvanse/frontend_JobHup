import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {

  static getAsyncValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      emailExists: 'El correo ya está siendo utilizado',
    };
    return config[validatorName];
  }
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    /**
     * Para las validaciones de cantidad máxima y cantidad minima de caracteres, tener en cuenta que
     * los variables que retornan como info deben ir en MINUSCULAS.
     */
    const config = {
      required: 'Campo obligatorio.',
      minlength: `Longitud mínima (${validatorValue.requiredLength})`,
      maxlength: `Longitud máxima (${validatorValue.requiredLength})`,
      requireobject: 'Debe seleccionar un item.',
      isMultiAlphanumeric: 'Campo solo admite letras y números.',
      isMultiAlpha: 'Campo solo admite letras.',
      number: 'Campo admite números y/o símbolos válidos',
      isNumeric: 'Campo admite solo números',
      pattern: 'Campo admite solo letras, numeros y/o símbolos válidos',
      isMultiAlphanumericSimbol:
        'Campo admite solo letras, numeros y/o símbolos válidos',
      email: 'Formato de correo no es válido',
      isEmail: 'Formato de correo no es válido',
      hasWhitespace: 'No se permite espacios en blanco.',
      isPhoneNumber: 'El numero ingresado no es válido.',
      isURL: 'La URL de la página ingresada no es correcta.',
      isMultiAlphaWithExceptions:
        'Campo admite letras, nros. y punto(.) y coma(,) .',
      isMultiAlphaWithHyphen: 'Campo no válido.', // 'Campo no admite carácteres especiales, excepto guión(-).',
      isNumericWithExceptions: 'Campo admite nros., (), #, *, - y +',
      isOnlyNumberAndScript: 'El numero ingresado no es válido.',
      isRUC: 'El RUC ingresado no valido.',
      max: `Excede el valor maximo a ${validatorValue.max}`,
      min: `El valor minimo es de ${validatorValue.min}`,
      validCampaign: 'Campaña no válida.'
    };
    return config[validatorName];
  }

  static campaignValidRange(c: AbstractControl): {[key: string]: boolean} | null {
    const startControl = c.get('inicio');
    const endControl = c.get('fin');

    if (startControl.pristine || endControl.pristine) {
      return null;
    }

    if (startControl.invalid || endControl.invalid) { // Do not validate if the controls are individually not valid
      return null;
    }

    const startYear = Number(startControl.value.substring(0, 4));
    const startCampaign = Number(startControl.value.substring(4));

    const endYear = Number(endControl.value.substring(0, 4));
    const endCampaign = Number(endControl.value.substring(4));


    if (((endYear > startYear) || (startYear === endYear && endCampaign >= startCampaign))) {
      return null;
    }

    return { campaignRange: true};
  }

  // static validCampaignS(c: AbstractControl): {[key: string]: boolean} | null {
  //   if (c.pristine || c.value.length < 6) {
  //     return null;
  //   }
  //   const year = Number(c.value.substring(0, 4));
  //   const campaign = Number(c.value.substring(4));
  //   if (year < 1950 || campaign < 1 || campaign > 18) {
  //     return { validCampaign : true };
  //   }
  //   return null;
  // }

  static validCampaign(minYear: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      if (c.pristine || c.value.length < 6) {
        return null;
      }
      const year = Number(c.value.substring(0, 4));
      const campaign = Number(c.value.substring(4));
      if (year < minYear || campaign < 1 || campaign > 18) {
        return { validCampaign : true };
      }
      return null;
    };
  }

  static composeOptional(validators: ValidatorFn[]): ValidatorFn {
    if (!validators) {
      return null;
    }
    const presentValidators = validators.filter(isPresent);
    if (presentValidators.length === 0) {
      return null;
    }

    return (control: AbstractControl) => {
      return !control.value
        ? null
        : _mergeErrors(_executeValidators(control, presentValidators));
    };
  }

  static isMultiAlphanumeric(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      // const regex = new RegExp('^[0-9a-zA-ZÁÉÍÑÓÚÜáéíóúüñ ]+$');
      const regex = new RegExp(
        '^\\s*(\\w|[ÁÉÍÑÓÚÜáéíóúüñ])+(\\s(\\w|[ÁÉÍÑÓÚÜáéíóúüñ])*)*$'
      );
      const value: string = control.value;
      return regex.test(value)
        ? null
        : {
            isMultiAlphanumeric: {
              requiredPattern: 'only allow letters y numbers',
              actualValue: value,
            },
          };
    };
  }

  static isAlphanumeric(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      const regex = new RegExp('^[0-9a-zA-Z]+$');
      const value: string = control.value;
      return regex.test(value)
        ? null
        : {
            isMultiAlphanumeric: {
              requiredPattern: 'only allow letters y numbers',
              actualValue: value,
            },
          };
    };
  }
  /**
   * Permite validar caracteres alfanumericos y simbolos especiales no incluye el punto.
   */
  static isMultiAlphanumericSimbol(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      // const regex = new RegExp('^[0-9a-zA-ZÁÉÍÑÓÚÜáéíóúüñ ]+$');
      const regex = new RegExp(
        '^\\s*(\\w|[ÁÉÍÑÓÚÜáéíóúüñ-]|\\/)+(\\s(\\w|[ÁÉÍÑÓÚÜáéíóúüñ-]|\\/)*)*$'
      );
      const value: string = control.value;
      return regex.test(value)
        ? null
        : {
            isMultiAlphanumericSimbol: {
              requiredPattern: 'only allow letters y numbers',
              actualValue: value,
            },
          };
    };
  }
  /**
   * Permite validar caracteres alfanumericos y simbolos especiales incluidos el punto.
   */
  static isAlphanumericOrthographicSimbols(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isEmptyInputValue(control.value)) {
        return null;
      }
      const regex = new RegExp(
        '^\\s*(\\w|[ÁÉÍÑÓÚÜáéíóúüñ-]|/./)+(\\s(\\w|[ÁÉÍÑÓÚÜáéíóúüñ-]|/./ )*)*$'
      );
      const value: string = control.value;
      return regex.test(value)
        ? null
        : {
            isMultiAlphanumericAnySimbol: {
              requiredPattern: 'only allow letters y numbers',
              actualValue: value,
            },
          };
    };
  }

  static isMultiAlpha(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      const regex = new RegExp('^[a-zA-ZÁÉÍÑÓÚÜáéíóúüñ ]+$');
      const value: string = control.value;
      return regex.test(value)
        ? null
        : {
            isMultiAlpha: {
              requiredPattern: 'only allow letters',
              actualValue: value,
            },
          };
    };
  }
  static isMultiAlphaSimbol(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      const regex = new RegExp('^[a-zA-ZÁÉÍÑÓÚÜáéíóúüñ- ]+$');
      const value: string = control.value;
      return regex.test(value)
        ? null
        : {
            isMultiAlphaSimbol: {
              requiredPattern: 'only allow letters with some symbols',
              actualValue: value,
            },
          };
    };
  }

  /**
   * Permite validar caracteres alfanumericos con excepciones (permite . y coma)
   */
  static isMultiAlphaWithExceptions(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      const regex = new RegExp('^([a-zA-Z0-9ÁÉÍÑÓÚÜáéíóúüñ. ,])*$');
      const value: string = control.value;
      return regex.test(value)
        ? null
        : {
            isMultiAlphaWithExceptions: {
              requiredPattern: 'only allow letters with some exceptions',
              actualValue: value,
            },
          };
    };
  }

  /**
   * Permite validar caracteres alfanumericos con excepciones (permite solo guión - )
   */
  static isMultiAlphaWithHyphen(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      const regex = new RegExp('^([a-zA-Z0-9 -])*$');
      const value: string = control.value;
      return regex.test(value)
        ? null
        : {
            isMultiAlphaWithHyphen: {
              requiredPattern: 'only allow letters with hyphen',
              actualValue: value,
            },
          };
    };
  }

  static isNumberSimbolHalf(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      let isValid = true;
      if (control.value.trim() !== '½') {
        const values = (control.value as string).split('½');
        for (let i = 0; i < values.length; i++) {
          if (i > 0 && (values[i - 1].endsWith(' ') || values[i - 1] === '')) {
            isValid = false;
            break;
          }
        }
      }

      const value: string = control.value;
      return isValid
        ? null
        : {
            isNumberSimbolHalf: {
              requiredPattern:
                'only allow symbol ½ with prefix letters and numbers.',
              actualValue: value,
            },
          };
    };
  }

  static isNumeric(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      const regex = new RegExp('^([0-9])*$');
      const value: string = control.value;
      return regex.test(value)
        ? null
        : {
            isNumeric: {
              requiredPattern: 'only allow numbers',
              actualValue: value,
            },
          };
    };
  }

  /**
   * Permite validar números con excepciones (permite mas(+), guión(-), paréntesis(), numeral (#), y asterisco (*)).
   */
  static isNumericWithExceptions(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      const regex = new RegExp('^([0-9 * + () # -])*$');
      const value: string = control.value;
      return regex.test(value)
        ? null
        : {
            isNumericWithExceptions: {
              requiredPattern: 'only allow numerics with Exceptions',
              actualValue: value,
            },
          };
    };
  }

  static requireObject(control: AbstractControl): { [key: string]: boolean } {
    return !control.value || typeof control.value === 'object'
      ? null
      : { requireobject: true };
  }

  static WhiteSpaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isEmptyInputValue(control.value)) {
        return null;
      }
      if (control.value.trim() === '') {
        return { hasWhitespace: true };
      } else {
        return null;
      }
    };
  }

  static isAlphanumericSymbol(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (isEmptyInputValue(control.value)) {
        return null; // don't validate empty values to allow optional controls
      }
      const regex = new RegExp('^([a-zA-Z0-9ÁÉÍÑÓÚÜáéíóúüñ.])*$');
      const value: string = control.value;
      return regex.test(value)
        ? null
        : {
            isAlphanumericSymbol: {
              requiredPattern: 'only allow letters with some symbols',
              actualValue: value,
            },
          };
    };
  }
  /**
   * Permite validar correo electronico.
   */
  static isOptionalEmail(control: AbstractControl): { [key: string]: any } {
    const value: string = control.value;
    // const regex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    // const regex = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
    const regex = /[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/g;
    if (isEmptyInputValue(value)) {
      return null; // don't validate empty values to allow optional controls
    }
    return regex.test(value) ? null : { isEmail: 'format of email incorrect.' };
  }
  /**
   * Permite validar numeros con simbolo "-".
   */
  static onlyNumberAndScript(control: AbstractControl): { [key: string]: any } {
    const regex = /^[0-9-]*$/i;
    const value: string = control.value;
    if (isEmptyInputValue(value)) {
      return null; // don't validate empty values to allow optional controls
    }
    return regex.test(value)
      ? null
      : { isOnlyNumberAndScript: 'the number and script is incorrect' };
  }
  /**
   * Permite validar solo url www.angular.io
   */
  static isURL(control: AbstractControl): { [key: string]: any } {
    const regex = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    const value: string = control.value;
    if (isEmptyInputValue(value)) {
      return null; // don't validate empty values to allow optional controls
    }
    return regex.test(value) ? null : { isURL: 'the URL is incorrect' };
  }
}

function _executeValidators(
  control: AbstractControl,
  validators: ValidatorFn[]
): any[] {
  return validators.map((v) => v(control));
}

function _mergeErrors(
  arrayOfErrors: ValidationErrors[]
): ValidationErrors | null {
  const result: { [key: string]: any } = arrayOfErrors.reduce(
    (res: ValidationErrors | null, errors: ValidationErrors | null) => {
      return errors != null ? { ...res, ...errors } : res;
    },
    {}
  );
  return Object.keys(result).length === 0 ? null : result;
}

function isEmptyInputValue(value: any) {
  return value == null || (typeof value === 'string' && value.length === 0);
}

function isPresent(o: any): boolean {
  return o != null;
}
