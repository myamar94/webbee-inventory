import { FORM_FIELD_TYPE } from '../enums';

export interface IFormField {
  id: string;
  label?: string;
  type: FORM_FIELD_TYPE;
}

export interface IProduct {
  id: string;
  fields: {
    [key: string]: string | boolean | number | Date;
  };
}

export interface ICategory {
  id: string;
  category: string | undefined | null;
  products: { [key: string]: IProduct };
  titleField?: string;
  formFields: {
    [key: string]: IFormField;
  };
}
