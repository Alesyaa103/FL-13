import React, {useState, useEffect} from 'react';
import styles from './styles.module.css';
import Button from '../Button';
import { Link, useLocation, useHistory} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {createCourse, updateCourse} from '../../actions/courseAction';

const Form = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [item, setItem] = useState({
    id: '',
    date: '',
    title: '',
    description: '',
    duration: '',
    authors: ''
  });
  const {state} = useLocation();
  useEffect(()=>{
    if (state) {
      setItem({
      ...item,
      ...state
    })}
    //eslint-disable-next-line
  }, [])
  const handleChange = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value
    })
  }
  const generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
  };
  const saveItem = (e) => {
    e.preventDefault();
    if (state) {
      dispatch(updateCourse(item))
    } else {
      dispatch(createCourse({
        ...item,
        id: generateId()
      }))
    }
    history.push('/')
  }

  return (
    <div className={styles.container}>
      <form action="" className={styles.form} onSubmit={saveItem}>
        <legend className={styles.form__title}>New course</legend>
        <label htmlFor="title">Title*</label>
        <input type="text" name="title" className={styles.search} value={item.title} aria-required onChange={handleChange}/>
        <label htmlFor="description">Description*</label>
        <textarea name="description" id="" cols="30" rows="10" aria-required value={item.description} onChange={handleChange}/>
        <div className={styles.form__flex}>
          <fieldset className={styles.form__flexBlock}>
            <label htmlFor="duration">Duration*</label>
            <input type="text" name="duration" className={styles.search} aria-required value={item.duration} onChange={handleChange}/>
            <label htmlFor="authors">Authors*</label>
            <input type="text" name="authors" className={styles.search} aria-required value={item.authors} onChange={handleChange}/>
          </fieldset>
          <fieldset className={styles.form__flexBlock}>
            <div className={styles.form__date}>
              <label htmlFor="date">Date*</label>
              {item.date && (
                <span>{new Date(item.date).getDate()}/{new Date(item.date).getMonth()}/{new Date(item.date).getFullYear()}</span>
              )}
            </div>
            <input type="date" name="date" id="date" aria-required value={item.date} onChange={handleChange}/>
          </fieldset>
        </div>
        <fieldset>
          <Button value="Save"/>
          <Link to="/" className={styles.form__cancelButton}>Cancel</Link>
        </fieldset>
      </form>
    </div>
  )
}

export default Form;