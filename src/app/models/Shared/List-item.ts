import { Dictionary } from "./Dictionary";

export interface ListItemCode {
    code: string;
    name: string;
  }

  export interface ListItem {
    id: string;
    name: string;
  }

  export interface ListItemSelect {
    id: string;
    name: string;
    selected: boolean;
  }
  
  export function mapArrayToListItemCollection(array: string[]): ListItem[] {
    const uniqueValues = [...new Set(array)];
    const list = uniqueValues.map((i) => ({
      id: i,
      name: i,
    }));
    return list;
  }
  
  export function mapStringDictionaryToListItemDictionary(dict: Dictionary<string[]>): Dictionary<ListItem[]> {
    const dictionary: Dictionary<ListItem[]> = {};
    Object.entries(dict).forEach(([key, value]) => {
      dictionary[key] = mapArrayToListItemCollection(value);
    });
    return dictionary;
  }
  
  export function mapDictionaryKeysToListItemArray<T>(dict: Dictionary<T>): ListItem[] {
    const list: ListItem[] = [];
    dict = dict ? dict : {};
    Object.entries(dict).forEach(([key, value]) => {
      list.push({
        id: key,
        name: key,
      });
    });
    return list;
  }
  
  export function getListItem(list: ListItem[], itemName: string): ListItem {
    const item = list.find(i => i.name === itemName);
    return item;
  }
  
  export function getSelectedItemsFromCSV(list: ListItem[], commaSeparatedValues: string, propertyName: string = 'name'): string[] {
    let selectedValues: string[] = [];
    if (commaSeparatedValues === 'ALL') {
      selectedValues = list.map(i => i[propertyName]);
    } else {
      selectedValues = commaSeparatedValues ? commaSeparatedValues.split(',').map(i => i.trim()) : [];
    }
    return selectedValues;
  }
  
  export function getCSVFromListItemArray(list: ListItem[], selectedValues: string[] | any): string {
    let valueToSave: string;
    if (list && selectedValues && list.length === selectedValues.length) {
      valueToSave = 'ALL';
    } else {
      valueToSave = selectedValues ? selectedValues.join() : '';
    }
    return valueToSave;
  }