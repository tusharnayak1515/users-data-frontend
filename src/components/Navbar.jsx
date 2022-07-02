import React, { useState } from 'react';
import {Link} from 'react-router-dom'; 
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { actionCreators } from '../redux';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';

import styles from '../styles/navbar.module.css';

const Navbar = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const [show, setShow] = useState(false);

  const onLogout = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.logout());
  }

  const onShow = (e)=> {
    e.preventDefault();
    setShow(show=> !show);
  }

  return (
    <div className={styles.navbar}>
        <div className={styles.logo}>
          <div className={styles.header}>
            <h2 className={styles.head}>User-Data</h2>
            <h2><IconButton className={styles.menuIcon} onClick={onShow}><MenuIcon fontSize='large' /></IconButton></h2>
          </div>
          {show && <div className={styles.menuDiv}>
            {user && <h3><Link to='/'>Home</Link></h3>}
            {user && <h3><Link to='/profile'>Profile</Link></h3>}
            {!user && <h3><Link to='/login'>Login</Link></h3>}
            {!user && <h3><Link to='/register'>Register</Link></h3>}
            {user && <h3><Link to='#' onClick={onLogout}>Logout</Link></h3>}
          </div>}
        </div>

        <div className={styles.menus}>
            {user && <h3><Link to='/'>Home</Link></h3>}
            {user && <h3><Link to='/profile'>Profile</Link></h3>}
            {!user && <h3><Link to='/login'>Login</Link></h3>}
            {!user && <h3><Link to='/register'>Register</Link></h3>}
            {user && <h3><Link to='#' onClick={onLogout}>Logout</Link></h3>}
        </div>
    </div>
  )
}

export default Navbar