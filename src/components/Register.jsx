import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionCreators } from '../redux';

import styles from '../styles/register.module.css';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const [userDetails, setUserDetails] = useState({name: "", email: "", phone: "", password: ""});

  const onValueChange = (e)=> {
    const { name, value } = e.target;
    e.preventDefault();
    setUserDetails({...userDetails, [name]: value});
  }

  const onRegister = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.register(userDetails));
    setUserDetails({name: "", email: "", phone: "", password: ""});
  }
    
  useEffect(()=> {
    if(user) {
        navigate("/", {replace: true});
    }
  }, [user, navigate]);
  return (
    <div className={styles.register}>
        <h1 className={styles.head}>Register</h1>
        <div className={styles.form}>
            <input type="text" name='name' value={userDetails.name} onChange={onValueChange} placeholder="Name" />
            <input type="email" name='email' value={userDetails.email} onChange={onValueChange} placeholder="Email Address" />
            <input type="number" name='phone' value={userDetails.phone} onChange={onValueChange} placeholder="Phone" />
            <input type="password" name='password' value={userDetails.password} onChange={onValueChange} placeholder="Password" />
            <button onClick={onRegister}>Register</button>
        </div>
    </div>
  )
}

export default Register;