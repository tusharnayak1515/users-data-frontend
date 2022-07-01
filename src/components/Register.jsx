import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  
  useEffect(()=> {
    if(user) {
        navigate("/", {replace: true});
    }
  }, [user, navigate]);
  
  return (
    <div className={styles.register}>
        Register
    </div>
  )
}

export default Register