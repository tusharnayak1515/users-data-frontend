import React, { useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from '../styles/profile.module.css';

const Profile = () => {
  const navigate = useNavigate();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  
  useEffect(()=> {
    if(!user) {
        navigate("/login", {replace: true});
    }
  }, [user, navigate]);
  return (
    <div className={styles.profile}>
        Profile
    </div>
  )
}

export default Profile;