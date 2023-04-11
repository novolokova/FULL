import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Error.module.scss';

const Error = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const showEror = setTimeout(() => {
      navigate('/', { replace: true });
      console.log(showEror);
    }, 2000);
    return () => clearTimeout(showEror);
  }, [navigate]);
  return (
    <div className={styles.container}>
      <img src="/images/error-404.jpg" alt="error 404" />
    </div>
  );
};

export default Error;
