import React, { useState} from 'react';
import styles from './styles.module.css';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCourse } from '../../actions/courseAction';

const List = ({courses, search}) => {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false)
  const deleteItem = item => () => {
    dispatch(deleteCourse(item))
  }
  const showPopup = id => (e) => setChecked(prevId => id === prevId ? false : id);
  let filtredItems = courses.filter(item => item.title.toLowerCase().indexOf(search)+1)
  return (
    <div className={styles.container}>
      {
        filtredItems.map(item => {
          const date = new Date(item.date)
          return (
            <div className={styles.item} key={item.id}>
              <span className={styles.item__credential}>{date.getDay()}/{date.getMonth()}/{date.getFullYear()}</span>
              <span className={styles.item__title}>{item.title}</span>
              <span className={styles.item__credential}>{item.description}</span>
              <span className={styles.item__credential}>{item.duration}</span>
              <div className={styles.item__menu}>
                <input type="button" className={styles.item__menu__check} onClick={showPopup(item.id)}/>
                <span className={styles.item__menu__dots}>&#x2807;</span>
                {checked === item.id && (<div className={styles.item__change}>
                  <div className={styles.change__item}>
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 512 512" enableBackground="new 0 0 512 512;"><g><g><polygon points="51.2,353.28 0,512 158.72,460.8"/>	</g></g><g>	<g><rect x="89.73" y="169.097" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -95.8575 260.3719)" width="353.277" height="153.599"/></g></g><g>	<g><path d="M504.32,79.36L432.64,7.68c-10.24-10.24-25.6-10.24-35.84,0l-23.04,23.04l107.52,107.52l23.04-23.04	C514.56,104.96,514.56,89.6,504.32,79.36z"/>	</g></g></svg>
                    <Link to={{pathname: '/form', state:item}}>Edit</Link>
                  </div>
                  <div className={styles.change__item}>
                    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20px" height="20px"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 7 5 L 17 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 5 7 L 5 22 L 19 22 L 19 7 L 5 7 z"/></svg>
                    <input type="button" value="Delete" onClick={deleteItem(item)}/>
                  </div>
                </div>)
                }
              </div>
              
            </div>
          )
        })
      }
    </div>
  )
}

export default List;