import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <>
      <h2>Page Not found</h2>
      <Link to="/">Go to HomePage</Link>
    </>
  );
};

export default Error404;
