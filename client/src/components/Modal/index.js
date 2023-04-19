import React from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.scss';

const Modal = (props) => {
  const { active, setActive, children } = props;
  return (
    <div
      className={active ? `${styles.modal} ${styles.active}` : styles.modal}
      onClick={() => setActive(false)}
    >
      <div
        className={
          active ? `${styles.content} ${styles.active}` : styles.content
        }
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
