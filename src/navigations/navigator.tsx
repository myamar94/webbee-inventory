import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';

import { Header } from '../components';
import { HomePage, CategoryPage, InventoryPage, Error404 } from '../pages';

const Navigator = () => {
  return (
    <BrowserRouter>
      <Header />
      <Container fluid className="py-2">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/categories/:categorySlug" element={<InventoryPage />} />
          <Route path="/page-not-found" element={<Error404 />} />
          <Route path="*" element={<Navigate to="/page-not-found" replace />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default Navigator;
