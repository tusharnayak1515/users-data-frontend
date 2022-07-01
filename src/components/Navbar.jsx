import React from 'react';
import {Link} from 'react-router-dom'; 
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { actionCreators } from '../redux';

import styles from '../styles/navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);

  const onLogout = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.logout());
  }

  return (
    <div className={styles.navbar}>
        <div className={styles.logo}>
            <h2>User-Data</h2>
        </div>

        <div className={styles.menus}>
            {user && <h3><Link to='/'>Home</Link></h3>}
            {user && <h3><Link to='/profile'>Profile</Link></h3>}
            {!user && <h3><Link to='/login'>Login</Link></h3>}
            {user && <h3><Link to='#' onClick={onLogout}>Logout</Link></h3>}
        </div>
    </div>
  )
}

export default Navbar