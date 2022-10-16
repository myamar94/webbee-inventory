import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

import { useAppSelector } from '../hooks';
import { selectCategoriesNavLinks } from '../store/inventorySlice';

const HeaderComponent = () => {
  const productCategories = useAppSelector(selectCategoriesNavLinks);
  const categoriesNavLinks = useMemo(() => {
    if (productCategories && productCategories.length) {
      return productCategories.map(({ id, category }) => (
        <Nav.Link key={`link-${id}`} as={Link} to={`/categories/${category}--${id}`}>
          {category}
        </Nav.Link>
      ));
    }

    return null;
  }, [productCategories]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          WebBee Inventory
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              All
            </Nav.Link>
            {categoriesNavLinks}
            <Nav.Link as={Link} to="/categories">
              Manage Categories
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;
