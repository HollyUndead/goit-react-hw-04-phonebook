import { useContext } from 'react';
import PropTypes from 'prop-types';

import { StateContext } from 'components/App';

export const ContactItem = ({ ...props }) => {
  const { name, number, elementId } = props;
  const { deleteFromState, transformNumber } = useContext(StateContext);

  const deletContact = () => {
    deleteFromState(elementId);
  };

  return (
    <li>
      <div className="contact-wrap">
        {name}: {transformNumber(number)}
        <button className="delete-contact" onClick={deletContact}>
          Delete
        </button>
      </div>
    </li>
  );
};

ContactItem.propTypes = {
  number: PropTypes.string,
  name: PropTypes.string,
  elementId: PropTypes.string,
};
