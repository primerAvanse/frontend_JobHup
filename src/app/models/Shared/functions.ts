import { Dictionary } from "./Dictionary";
import { ListItem } from "./List-item";
import intersection from 'lodash/intersection';

export const INT_REG_EXP: RegExp = /^[0-9]+$/;
export const FLOAT_REG_EXP: RegExp = /^([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
export const FLOAT_NEGATIVE_REG_EXP: RegExp = /^-?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
export const ALPHANUMERIC_REG_EXP: RegExp = /^[A-Za-z0-9]+$/;

export function getSimpleStatubarConfig() {
  return {
    statusPanels: [
      { statusPanel: 'agTotalRowCountComponent', align: 'left' },
      { statusPanel: 'agFilteredRowCountComponent', align: 'center' },
      { statusPanel: 'agSelectedRowCountComponent', align: 'right' },
    ],
  };
}

// if you want only one space remove the '+' after the white space in the middle of the RegExp
export const ALPHANUMERIC_WITH_SPACE_REG_EXP: RegExp =
  /^[a-zA-Z0-9]+( +[a-zA-Z0-9]+)*$/;
export function isCellEmpty(params: any) {
  return isValueEmpty(params.value);
}

export function isValueEmpty(value: any) {
  return typeof value === 'undefined' || value === '' || value === null;
}

export function areAllRequiredCellsFilledIn(
  params: any,
  requiredCols: string[]
): boolean {
  let isWholeRowValid = true;
  let cellValue;
  for (const colName of requiredCols) {
    cellValue = params.node.data[colName];
    if (isValueEmpty(cellValue)) {
      isWholeRowValid = false;
      break;
    }
  }
  return isWholeRowValid;
}

export function setRowValidaty(
  params: any,
  validRowCallbackFunction: () => boolean
) {
  // if (!areAllRequiredCellsFilledIn(params, requiredCols)) {
  if (!validRowCallbackFunction()) {
    if (params.node.data.valid === true) {
      // params.node.setDataValue('valid', false);
      params.node.data.valid = false;
    }
  } else {
    if (params.node.data.valid === false) {
      // params.node.setDataValue('valid', true);
      params.node.data.valid = true;
    }
  }
}

export function getInvalidRowsCount(gridApi: any): number {
  let invalidRowsCount = 0;
  gridApi.forEachNode((node) => {
    if (!node.data.valid) {
      invalidRowsCount++;
    }
  });
  return invalidRowsCount;
}

export function getInvalidModifiedRowsCount(gridApi: any): number {
  // ****** INCLUDE NEW ADDED ROWS *******
  let invalidRowsCount = 0;
  gridApi.forEachNode((node) => {
    if (!node.data.valid && (node.data.isModified || node.data.isNew)) {
      invalidRowsCount++;
    }
  });
  return invalidRowsCount;
}

export function getModifiedRowsCount(gridApi: any): number {
  let modifiedRowsCount = 0;
  gridApi.forEachNode((node) => {
    if (node.data.isModified || node.data.isNew) {
      modifiedRowsCount++;
    }
  });
  return modifiedRowsCount;
}

export function getRowsCount(gridApi: any): number {
  let numberOfRows = 0;
  gridApi.forEachNode((node) => numberOfRows++);
  return numberOfRows;
}

export function getRichSelectorValuesFromDictionary<T>(
  dictionary: Dictionary<T>
): string[] {
  if (dictionary) {
    return Object.keys(dictionary);
  } else {
    return [];
  }
}

export function convertValueToUpperCase(params: any, colName: string): boolean {
  if (params.data[colName] !== params.newValue) {
    params.data[colName] = params.newValue && params.newValue.toUpperCase();
    return true;
  } else {
    return false;
  }
}

//#region ProcessPastedData

export function processAlphanumericData(
  data: any,
  colId: string,
  newValue: any
) {
  const result =
    ALPHANUMERIC_WITH_SPACE_REG_EXP.test(newValue) || isValueEmpty(newValue);
  if (result) {
    return newValue;
  } else {
    return data[colId]; // use oldValue
  }
}

export function processIntegerData(
  data: any,
  colId: string,
  newValue: any,
  allowsEmptyValues: boolean = false
) {
  newValue = isString(newValue) ? newValue.trim() : newValue;
  if (allowsEmptyValues && isValueEmpty(newValue)) {
    return null; // clear out value
  }
  const valueToAdd = Number(newValue);
  if (Number.isNaN(valueToAdd)) {
    return data[colId]; // use oldValue
  }
  if (Number.isInteger(valueToAdd)) {
    return valueToAdd;
  }
  const result = FLOAT_REG_EXP.test(newValue);
  if (result) {
    return Math.round(valueToAdd); // round float number
  } else {
    return data[colId]; // use oldValue
  }
}

export function processFloatData(
  data: any,
  colId: string,
  newValue: any,
  allowsEmptyValues: boolean = false
) {
  newValue = isString(newValue) ? newValue.trim() : newValue;
  if (allowsEmptyValues && isValueEmpty(newValue)) {
    return null; // clear out value
  }
  const result = FLOAT_REG_EXP.test(newValue);
  if (result) {
    return newValue;
  } else {
    return data[colId]; // use oldValue
  }
}

export function processDrowpdownData<T>(
  dictionary: Dictionary<T>,
  data: any,
  colId: string,
  newValue: any,
  allowsEmptyValues: boolean = false
) {
  newValue = isString(newValue) ? newValue.trim() : newValue;
  if (allowsEmptyValues && isValueEmpty(newValue)) {
    return null; // clear out value
  }
  const correspondingValue = dictionary && dictionary[newValue];
  if (correspondingValue) {
    return newValue;
  } else {
    return data[colId]; // use oldValue
  }
}
export function processArrayData<T>(
  array: Array<T>,
  data: any,
  colId: string,
  newValue: any,
  allowsEmptyValues: boolean = false
) {
  newValue = isString(newValue) ? newValue.trim() : newValue;
  if (allowsEmptyValues && isValueEmpty(newValue)) {
    return null; // clear out value
  }
  const arrayItem = array && array.find((item) => item == newValue);
  if (arrayItem) {
    return newValue;
  } else {
    // return null; // clear out value
    return data[colId]; // use oldValue
  }
}

export function processMultiSelectData(
  array: ListItem[],
  data: any,
  colId: string,
  newValue: string
) {
  const itemsFromCSV = newValue
    ? newValue
      .toString()
      .split(',')
      .map((i) => i.trim())
    : [];
  const availableOptions =
    array && array.length > 0 ? array.map((i) => i.name) : [];
  const intersectedValues = getArrayIntersectionAsCSV(
    itemsFromCSV,
    availableOptions
  );
  return intersectedValues ? intersectedValues : data[colId];
}
export function processBooleanData(data: any, colId: string, newValue: any) {
  const normalizedValue = newValue && newValue.toLowerCase().trim();
  if (normalizedValue === 'true' || normalizedValue === '1') {
    return true;
  } else if (normalizedValue === 'false' || normalizedValue === '0') {
    return false;
  } else {
    return data[colId]; // use oldValue
  }
}

//#endregion ProcessPastedData

export function customBooleanCellRenderer(params: any, colId: string): string {
  let classIcon;
  let title: string;
  if (params.data[colId]) {
    classIcon = 'ag-icon-tick';
    // classIcon = 'fa-check';
    title = 'true';
  } else {
    classIcon = 'ag-icon-cross';
    // classIcon = 'fa-times';
    title = 'false';
  }
  return (
    '<span title="' +
    title +
    '" class="ag-icon ' +
    classIcon +
    ' content-icon"></span>'
  );
  // return '<i class="fa ' + classIcon + '"></i>';
}

export function newRowsOnTop(isNew: Function) {
  return function (rowNodes) {
    function move(toIndex, fromIndex) {
      rowNodes.splice(toIndex, 0, rowNodes.splice(fromIndex, 1)[0]);
    }
    for (let i = 0; i < rowNodes.length; i++) {
      if (isNew(rowNodes[i])) {
        move(0, i);
      }
    }
  };
}

export function markColumnsAsRequired(
  cols: any[],
  requiredCols: string[]
): any[] {
  const colsMarked = cols.map((c) => {
    if (!requiredCols.includes(c.field)) {
      return c;
    }
    return {
      ...c,
      cellClassRules: { 'required-cell': (params) => isCellEmpty(params) },
    };
  });
  return colsMarked;
}

export function floatFormatter(params, precision: number) {
  const { value } = params;
  if (isValueEmpty(value)) {
    return value;
  }
  return Number.parseFloat(value).toFixed(precision);
}

export function truncateNumberWithPrecision(
  params,
  fieldName: string,
  precision: number
) {
  let { newValue } = params;
  if (isValueEmpty(newValue)) {
    params.data[fieldName] = newValue;
    return true;
  } else {
    if (Number.isNaN(newValue)) {
      return false;
    } else {
      newValue = truncateNumber(newValue, precision);
      params.data[fieldName] = Number(newValue);
      return true;
    }
  }
}

/**
 * Makes sure the newly entered value is not less than the @param min or empty
 * If does, that value is ignored
 */
export function checkMinValue(params, fieldName: string, min: number) {
  const { newValue } = params;
  if (isValueEmpty(newValue)) {
    return false;
  } else {
    if (Number.isNaN(newValue)) {
      return false;
    } else {
      const value = Number(newValue);
      if (value < min) {
        return false;
      } else {
        params.data[fieldName] = value;
        return true;
      }
    }
  }
}

/**
 * Makes sure the newly entered value is not empty or less than the @param defaultValue
 * If does, the @param defaultValue is used instead
 * Optionally you can use the @param precision to truncate a decimal number
 */
export function numericWithDefaultIfEmpty(
  params: any,
  fieldName: string,
  defaultValue: number,
  precesion: number = 0
) {
  const { newValue } = params;
  if (isValueEmpty(newValue)) {
    params.data[fieldName] = defaultValue;
    return true;
  } else {
    if (Number.isNaN(newValue)) {
      return false;
    } else {
      const value = Number(newValue);
      if (value <= defaultValue) {
        params.data[fieldName] =
          precesion > 0
            ? truncateNumber(defaultValue, precesion)
            : defaultValue;
        return true;
      } else {
        params.data[fieldName] =
          precesion > 0 ? truncateNumber(value, precesion) : value;
        return true;
      }
    }
  }
}

/**
 * Makes sure the newly entered value is a valid number. If it isn't, the value is ignored.
 * This function allows empty values.
 * Optionally you can use a @precision greater than zero to truncate a decimal number
 */
export function nullableNumber(
  params: any,
  fieldName: string,
  precesion: number = 0,
  minValue: number
) {
  const { newValue } = params;
  if (isValueEmpty(newValue)) {
    params.data[fieldName] = newValue;
    return true;
  }
  if (Number.isNaN(newValue)) {
    return false;
  }
  const value = Number(newValue);
  if (value <= minValue) {
    params.data[fieldName] =
      precesion > 0 ? truncateNumber(minValue, precesion) : minValue;
    return true;
  } else {
    params.data[fieldName] =
      precesion > 0 ? truncateNumber(value, precesion) : value;
    return true;
  }
}

export function isFirstColumn(params) {
  const displayedColumns = params.columnApi.getAllDisplayedColumns();
  const thisIsFirstColumn = displayedColumns[0] === params.column;
  return thisIsFirstColumn;
}

export function checkIfDuplicateExists<T>(array: T[]) {
  return new Set(array).size !== array.length;
}

export function getColIndex(colDefs: any[], field: string): number {
  return colDefs.findIndex((c: any) => c.field === field);
}

function truncateNumber(numberValue: any, precision: number): number {
  numberValue = numberValue.toString();
  const decimalPointPosition = numberValue.indexOf('.');
  if (decimalPointPosition > 0) {
    numberValue = numberValue.slice(0, decimalPointPosition + precision + 1);
  }
  return Number(numberValue);
}

function getArrayIntersectionAsCSV(
  searchList: string[],
  list: string[]
): string {
  // The order and references of result values are determined by the first array.
  const intersectedValues = intersection(searchList, list);
  if (intersectedValues && intersectedValues.length > 0) {
    return intersectedValues.join();
  } else {
    return null;
  }
}

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

export function sizeToFit(gridOptions) {
  gridOptions.api.sizeColumnsToFit();
}

export function autoSizeAll(gridOptions, skipHeader) {
  const allColumnIds = [];
  gridOptions.columnApi.getAllColumns().forEach((column) => {
    allColumnIds.push(column.getId());
  });

  gridOptions.columnApi.autoSizeColumns(allColumnIds, skipHeader);
}