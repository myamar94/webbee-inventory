import { useMemo } from 'react';
import { Button } from 'react-bootstrap';

import { CategoryForm } from '../components';
import { useAppDispatch, useAppSelector } from '../hooks';
import { inventoryActions, selectCategories } from '../store/inventorySlice';
import PageTemplate from '../components/templates/page.template';

const CategoryPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);

  const handleOnClickAddCategory = () => {
    dispatch(inventoryActions.createCategory());
  };

  const categoryList = useMemo(() => {
    if (categories && categories.length) {
      return categories.map((category) => <CategoryForm key={category.id} {...category} />);
    }

    return [];
  }, [categories]);

  return <PageTemplate sections={[...categoryList, <Button onClick={handleOnClickAddCategory}>Add category</Button>]} />;
};

export default CategoryPage;
