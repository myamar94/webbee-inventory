import BaseForm from './BaseForm';
import FormBuilder from './FormBuilder';

import { IFormField, IProduct } from '../../interfaces';
import { useAppDispatch } from '../../hooks';
import { inventoryActions } from '../../store/inventorySlice';

interface IInventoryItemFormProps {
  formFields: Array<IFormField>;
  formTitle: string;
  item: IProduct;
  categoryId: string;
}

const InventoryItemForm: React.FC<IInventoryItemFormProps> = ({ item, categoryId, formFields, formTitle }): JSX.Element => {
  const dispatch = useAppDispatch();

  const handleOnChangeForm = (fieldId: string, evt: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    if (categoryId && item?.id && fieldId) {
      const fieldType = evt.target.getAttribute('type');

      dispatch(
        inventoryActions.updateInventoryItem({
          categoryId,
          itemId: item.id,
          field: { id: fieldId, value: fieldType === 'checkbox' ? (evt.target as any).checked : evt.target.value },
        })
      );
    }
  };
  const handleOnClickDeleteBtn = () => dispatch(inventoryActions.deleteInventoryItem({ categoryId, itemId: item.id }));

  return (
    <BaseForm title={formTitle} onDelete={handleOnClickDeleteBtn}>
      <FormBuilder {...{ formFields }} values={item.fields} onChangeForm={handleOnChangeForm} />
    </BaseForm>
  );
};

export default InventoryItemForm;
