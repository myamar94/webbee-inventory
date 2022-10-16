import { useMemo } from 'react';
import { Row, Col } from 'react-bootstrap';

const PageTemplate: React.FC<{ sections: Array<React.ReactNode> }> = ({ sections }): JSX.Element => {
  const sectionCols = useMemo(() => {
    if (sections?.length) {
      return sections.map((section, idx) => (
        <Col className="mb-3" key={`section-${idx}`}>
          {section}
        </Col>
      ));
    }
  }, [sections]);

  return (
    <Row xs={1} sm={1} md={2} lg={3} xl={3} xxl={4} xxxl={4}>
      {sectionCols}
    </Row>
  );
};

export default PageTemplate;
