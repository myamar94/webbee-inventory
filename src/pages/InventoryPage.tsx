import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';

import { extractIDFromURI } from '../utils';
import { InventoryListing } from '../components';
import { useAppSelector } from '../hooks';
import { selectCategory } from '../store/inventorySlice';

const InventoryPage = (): JSX.Element => {
  const navigate = useNavigate();
  const { categorySlug } = useParams();

  const categoryId = extractIDFromURI(categorySlug);
  const selectedCategory = useAppSelector(selectCategory(categoryId));

  useEffect(() => {
    if (!selectedCategory) {
      navigate('/page-not-found', { replace: true });
    }
  }, [selectedCategory, navigate]);

  if (!selectedCategory) {
    return <></>;
  }

  return <InventoryListing category={selectedCategory} />;
};

export default InventoryPage;
