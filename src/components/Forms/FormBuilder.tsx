import React, { useMemo } from 'react';
import { Form } from 'react-bootstrap';

import { IFormField } from '../../interfaces';
import { FORM_FIELD_TYPE } from '../../enums';

const FormBuilder: React.FC<{
  formFields: Array<IFormField>;
  values: { [key: string]: string | boolean | number | Date };
  onChangeForm: (fieldId: string, evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}> = ({ formFields, values, onChangeForm }): JSX.Element => {
  const formElements = useMemo(() => {
    if (formFields) {
      return formFields.map(({ label, type, id: fieldId }) => {
        switch (type) {
          case FORM_FIELD_TYPE.CHECKBOX:
            const checked = (values?.[fieldId] && typeof values?.[fieldId] === 'boolean') || false;
            return (
              <Form.Check key={fieldId} className="mb-3" type={'checkbox'}>
                <Form.Check.Input type={'checkbox'} {...{ checked }} onChange={onChangeForm.bind(null, fieldId)} />
                {label && <Form.Check.Label>{label}</Form.Check.Label>}
              </Form.Check>
            );

          case FORM_FIELD_TYPE.TEXT:
          case FORM_FIELD_TYPE.NUMBER:
          case FORM_FIELD_TYPE.DATE:
            const currentValue = values?.[fieldId] || '';

            return (
              <Form.Group key={fieldId} className="mb-3">
                {label && <Form.Label>{label}</Form.Label>}
                <Form.Control value={String(currentValue)} type={type.toLowerCase()} onChange={onChangeForm.bind(null, fieldId)} />
              </Form.Group>
            );

          default:
            return null;
        }
      });
    }
  }, [formFields, onChangeForm, values]);

  return <>{formElements}</>;
};

export default FormBuilder;
