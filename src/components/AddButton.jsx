import React from 'react';

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const AddButton = ({ onClick }) => {
  return (
    <button className="add-button" onClick={onClick}>
      <FontAwesomeIcon icon={faPlus} />
    </button>
  );
};

AddButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default AddButton;


