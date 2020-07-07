import React from 'react';
import styles from './styles.module.css';

const Button = ({value}) => {
  return (
    <input type="submit" value={value} className={styles.button}/>
  )
}

export default Button;