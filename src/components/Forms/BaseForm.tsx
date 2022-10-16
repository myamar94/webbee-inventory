import { Stack, Card, Form } from 'react-bootstrap';
import TrashIcon from '../../assets/icons/trash-solid.svg';

interface IBaseFormProps {
  children: React.ReactNode;
  title?: string;
  onDelete?: () => void;
  customFooter?: React.ReactNode;
}

const BaseForm: React.FC<IBaseFormProps> = ({ customFooter, title, children, onDelete }): JSX.Element => {
  return (
    <Card className="h-100">
      <Card.Header>
        <Stack direction="horizontal" className="justify-content-between align-items-center">
          <Card.Title className="m-0">{title}</Card.Title>
          <button type="button" className="btn" onClick={onDelete}>
            <img src={TrashIcon} alt="delete" style={{ height: '1.125rem', width: '1.125rem' }} />
          </button>
        </Stack>
      </Card.Header>
      <Card.Body>
        <Form>{children}</Form>
      </Card.Body>
      {customFooter}
    </Card>
  );
};

export default BaseForm;
