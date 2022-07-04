import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionCreators } from '../redux';

import styles from '../styles/login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const [userDetails, setUserDetails] = useState({email: "", password: ""});
  const [error, setError] = useState();

  const onValueChange = (e)=> {
    const { name, value } = e.target;
    e.preventDefault();
    setUserDetails({...userDetails, [name]: value});
  }

  const onLogin = (e)=> {
    e.preventDefault();
    if(userDetails.email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
     && userDetails.password.trim().length !== 0) 
     {
       dispatch(actionCreators.login(userDetails));
       setUserDetails({name: "", email: "", phone: "", password: ""});
     }
     else {
      if(!userDetails.email.match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")) {
        setError("Enter a valid email!");
      }
      else {
        setError("Password must contain atleast 1 uppercase, 1 lowercase, 1 special character, and 1 number!");
      }
     }
  }
    
  useEffect(()=> {
    if(user) {
        navigate("/", {replace: true});
    }
  }, [user, navigate]);
  return (
    <div className={styles.login}>
        <h1 className={styles.head}>Login</h1>
        <div className={styles.form}>
            <input type="email" name='email' value={userDetails.email} onChange={onValueChange} placeholder="Email Address" />
            <input type="password" name='password' value={userDetails.password} onChange={onValueChange} placeholder="Password" />
            <button onClick={onLogin}>Login</button>
        </div>
    </div>
  )
}

export default Login