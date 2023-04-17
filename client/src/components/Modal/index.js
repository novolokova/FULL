import React from 'react';
import PropTypes from 'prop-types';
import './modal.css';

const Modal = (props) => {
  const { active, setActive, children } = props;
  return (
    <div
      className={active ? 'modal active' : 'modal'}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? 'content active' : 'content'}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Modal;
