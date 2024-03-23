import React from 'react';

const AddButton = ({ onClick, text }) => {
  return (
    <button
      onClick={onClick}
      style={{ backgroundColor: 'green' }}
      className='btn'
    >
      {text}
    </button>
  )
}

export default AddButton;