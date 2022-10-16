import { useMemo } from 'react';
import { ButtonGroup, Dropdown, DropdownButton as RBDropdownBtn, DropdownButtonProps } from 'react-bootstrap';

import { FORM_FIELD_TYPE } from '../../enums';

interface IDropdownButtonItem {
  label: string;
  eventKey: string | FORM_FIELD_TYPE;
}

interface IDropdownButtonProps extends Omit<DropdownButtonProps, 'children' | 'title'> {
  items: Array<IDropdownButtonItem>;
  title: string | FORM_FIELD_TYPE;
}

const DropdownButton: React.FC<IDropdownButtonProps> = ({ items, ...restProps }): JSX.Element => {
  const dropdownItems = useMemo(() => {
    return items.map(({ eventKey, label }, idx) => {
      return (
        <Dropdown.Item key={`dropdown-item-${eventKey}`} {...{ eventKey }}>
          {label}
        </Dropdown.Item>
      );
    });
  }, [items]);

  return (
    <RBDropdownBtn as={ButtonGroup} {...restProps} v>
      {dropdownItems}
    </RBDropdownBtn>
  );
};

export default DropdownButton;
