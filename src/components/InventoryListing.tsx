import { useMemo } from 'react';
import { Button } from 'react-bootstrap';

import PageTemplate from './templates/page.template';
import { useAppDispatch } from '../hooks';
import { ICategory } from '../interfaces';
import InventoryItemForm from './Forms/InventoryItemForm';
import { inventoryActions } from '../store/inventorySlice';

interface IInventoryListingProps {
  category: ICategory;
}

const InventoryListing: React.FC<IInventoryListingProps> = ({ category }): JSX.Element => {
  const dispatch = useAppDispatch();
  const { id: categoryId, formFields, titleField, products } = category || {};

  const handleOnClickAddItem = () => {
    if (categoryId) {
      dispatch(inventoryActions.createInventoryItem(categoryId));
    }
  };

  const inventoryItems = useMemo(() => {
    const selectedCategoryFormFields = formFields ? Object.values(formFields) : null;
    const titleFieldId = titleField || null;

    if (products && selectedCategoryFormFields?.length) {
      return Object.entries(products).map(([productId, product]) => {
        if ([productId]) {
          const formTitle = String((titleFieldId && product?.fields?.[titleFieldId]) || '');
          return <InventoryItemForm key={productId} formFields={selectedCategoryFormFields} {...{ formTitle, categoryId }} item={product} />;
        }
        return null;
      });
    }

    return [];
  }, [categoryId, products, formFields, titleField]);

  return <PageTemplate sections={[...inventoryItems, <Button onClick={handleOnClickAddItem}>Add Item</Button>]} />;
};

export default InventoryListing;
