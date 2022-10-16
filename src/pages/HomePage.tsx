import { useMemo } from 'react';
import { Form, Button } from 'react-bootstrap';

import { useAppSelector, useAppDispatch } from '../hooks';
import { InventoryListing } from '../components';
import { selectInventoryList, inventoryActions } from '../store/inventorySlice';

const HomePage = (): JSX.Element => {
  const inventoryList = useAppSelector(selectInventoryList);
  const dispatch = useAppDispatch();

  const handleOnClickAddCategory = () => {
    dispatch(inventoryActions.createCategory());
  };

  const inventoryListByCategories = useMemo(() => {
    if (!Object.entries(inventoryList).length) {
      return null;
    }
    return Object.entries(inventoryList).map(([categoryId, { category, ...restCategoryDetails }], idx) => {
      return (
        <div key={categoryId} className="mb-5">
          <h3 className="mb-1">{category || 'New Category'}</h3>
          <Form.Text muted>UID: {categoryId}</Form.Text>
          <hr />
          <InventoryListing category={Object.assign({ category }, restCategoryDetails)} />
        </div>
      );
    });
  }, [inventoryList]);

  return (
    <>
      {inventoryListByCategories}
      <Button onClick={handleOnClickAddCategory}>Add category</Button>
    </>
  );
};

export default HomePage;
