import React, { useState } from 'react';
import styles from './styles.module.css';
import Button from '../Button';
import List from '../List';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MainPage = () => {
  const courses  = useSelector(state => {
    const { data } = state.courses;
    return data;
  });
  const [search, setSearch] = useState('');
  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  return (
    <div className="container">
      <div className={styles.options}>
        <input type="text" placeholder="Search" value={search} className={styles.search} onChange={handleChange}/>
        <Link to="/form">
          <Button value="Add course"/>
        </Link>
      </div>
      <List courses={courses} search={search}/>
    </div>
  )
}

export default MainPage;