import React, { useMemo, useCallback } from 'react';
import { Form, InputGroup, Card } from 'react-bootstrap';
import { nanoid } from '@reduxjs/toolkit';

import BaseForm from './BaseForm';
import DropdownButton from './DropdownButton';

import { ICategory } from '../../interfaces';
import { FORM_FIELD_TYPE } from '../../enums';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { inventoryActions } from '../../store/inventorySlice';
import { selectFormFields } from '../../store/uiSlice';

const CategoryForm: React.FC<ICategory> = ({ id, category, formFields, ...rest }): JSX.Element => {
  const dispatch = useAppDispatch();
  const formFieldTypes = useAppSelector(selectFormFields);

  const handleOnChange = (field: string, evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = evt.target.value;
    dispatch(inventoryActions.updateCategory({ ...rest, category, formFields, [field]: value, id }));
  };

  const handleOnChangeFieldType = useCallback(
    (fieldId: string, fieldType: string | null) => {
      if (fieldType) {
        if (fieldType === FORM_FIELD_TYPE.REMOVE) {
          dispatch(inventoryActions.deleteCategoryFormField({ categoryId: id, formFieldId: fieldId }));
        } else {
          if (formFields?.[fieldId]) {
            const newFormFields = { ...formFields };
            newFormFields[fieldId] = { ...formFields[fieldId], type: FORM_FIELD_TYPE[fieldType as keyof typeof FORM_FIELD_TYPE] };
            dispatch(inventoryActions.updateCategory({ ...rest, category, id, formFields: newFormFields }));
          }
        }
      }
    },
    [dispatch, id, formFields, rest, category]
  );

  const handleOnChangeFieldLabel = useCallback(
    (fieldId: string, evt: React.ChangeEvent<HTMLInputElement>) => {
      if (formFields?.[fieldId]) {
        const newFormFields = { ...formFields };
        newFormFields[fieldId] = { ...formFields[fieldId], label: evt.target.value };
        dispatch(inventoryActions.updateCategory({ ...rest, category, id, formFields: newFormFields }));
      }
    },
    [dispatch, id, formFields, rest, category]
  );

  const categoryDynamicFields = useMemo(() => {
    if (formFields && Object.keys(formFields).length) {
      return Object.keys(formFields).map((formFieldId: string, idx: number) => {
        const { type: currentFieldType, label } = formFields[formFieldId];
        const dropdownItems = idx > 0 ? [...formFieldTypes, { label: 'Remove', eventKey: FORM_FIELD_TYPE.REMOVE }] : formFieldTypes;
        return (
          <InputGroup className="mb-3" key={formFieldId}>
            <Form.Control value={label} onChange={handleOnChangeFieldLabel.bind(null, formFieldId)} />
            <DropdownButton
              items={dropdownItems}
              title={currentFieldType}
              id={`dropdown-button-field-type`}
              variant="secondary"
              onSelect={(v) => handleOnChangeFieldType(formFieldId, v)}
            />
          </InputGroup>
        );
      });
    }
  }, [formFields, formFieldTypes, handleOnChangeFieldType, handleOnChangeFieldLabel]);

  const titleFieldOptions = useMemo(() => {
    if (formFields && Object.keys(formFields).length) {
      return Object.keys(formFields).map((formFieldId: string) => {
        const { label } = formFields[formFieldId];

        if (!label) {
          return null;
        }

        return (
          <option key={formFieldId} value={formFieldId}>
            {label}
          </option>
        );
      });
    }
  }, [formFields]);

  const handleOnClickDeleteBtn = () => dispatch(inventoryActions.deleteCategory(id));

  const handleOnSelectField = (fieldType: string | null) => {
    if (fieldType) {
      const fieldId = nanoid();
      dispatch(
        inventoryActions.updateCategory({
          ...rest,
          id,
          category,
          formFields: { ...formFields, [fieldId]: { id: fieldId, label: '', type: FORM_FIELD_TYPE[fieldType as keyof typeof FORM_FIELD_TYPE] } },
        })
      );
    }
  };

  const formFooter = (
    <Card.Footer>
      <DropdownButton items={formFieldTypes} drop="up" title="Add Field" id={`dropdown-button-drop-up`} onSelect={handleOnSelectField} />
    </Card.Footer>
  );

  return (
    <BaseForm onDelete={handleOnClickDeleteBtn} customFooter={formFooter} title={category || 'New Category'}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control value={category || ''} onChange={handleOnChange.bind(null, 'category')} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Select Title Field</Form.Label>
        <Form.Select value={rest.titleField} aria-label="select title field" onChange={handleOnChange.bind(null, 'titleField')}>
          {titleFieldOptions}
        </Form.Select>
      </Form.Group>
      <hr />
      {categoryDynamicFields}
    </BaseForm>
  );
};

export default CategoryForm;
