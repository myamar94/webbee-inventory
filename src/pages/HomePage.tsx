import { useMemo } from 'react';
import { Form } from 'react-bootstrap';

import { useAppSelector } from '../hooks';
import { InventoryListing } from '../components';
import { selectInventoryList } from '../store/inventorySlice';

const HomePage = (): JSX.Element => {
  const inventoryList = useAppSelector(selectInventoryList);

  const inventoryListByCategories = useMemo(() => {
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
  return <>{inventoryListByCategories}</>;
};

export default HomePage;
