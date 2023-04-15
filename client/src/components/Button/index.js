import React from 'react';
import styles from './Button.module.scss';


const Button = (props) => {
    const { children } = props;
    return (
        <button 
            className={styles.btn}>
            {children}
        </button>
    );
}

export default Button;
