import { get } from 'lodash';

export const escapeRegexCharacters = str => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

export const getSuggestions = (value, suggestions) => {
  const escapedValue = escapeRegexCharacters(value.toLowerCase().trim());
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : suggestions.filter(suggestion => suggestion.name.toLowerCase().includes(escapedValue));
};

export const shouldRenderSuggestions = value => value.trim().length > 2;

export const initialValidation = (fieldName, initialValue) => {
  const fieldInitialized = !!get(initialValue, fieldName);
  const isValueFieldArray =
    fieldInitialized && fieldName.includes('.') && fieldName.includes('[')
      ? initialValue[fieldName.split('.')[0].split('[')[0]][
          fieldName
            .split('.')[0]
            .split('[')[1]
            .split(']')[0]
        ][fieldName.split('.')[1]]
      : false;
  const isValueSimpleObject =
    fieldInitialized && fieldName.includes('.') && !fieldName.includes('[') ? initialValue[fieldName.split('.')[0]][fieldName.split('.')[1]] : false;
  const labelForValueFieldArray = isValueFieldArray
    ? initialValue[fieldName.split('.')[0].split('[')[0]][
        fieldName
          .split('.')[0]
          .split('[')[1]
          .split(']')[0]
      ][fieldName.split('.')[1].replace('Id', 'Name')]
    : false;
  const labelForValueSimpleObject = isValueSimpleObject
    ? initialValue[fieldName.split('.')[0]][fieldName.split('.')[1].replace('Id', 'Name')]
    : false;
  const labelValueNested = labelForValueFieldArray || labelForValueSimpleObject;
  const initialValueFieldName = initialValue ? initialValue[fieldName] : null;
  const finalValue = labelValueNested || initialValueFieldName;
  const initialValueToSet = fieldInitialized ? { value: finalValue, suggestions: [] } : { suggestions: [] };
  return initialValueToSet;
};
