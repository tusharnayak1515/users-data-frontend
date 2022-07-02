import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionCreators } from '../redux';
import EditIcon from '@mui/icons-material/Edit';

import styles from '../styles/profile.module.css';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user,profile} = useSelector(state=> state.userReducer,shallowEqual);
  const [userDetails, setUserDetails] = useState({name: profile?.name, email: profile?.email, phone: profile?.phone});
  const [edit, setEdit] = useState(false);

  const onChangeHandler = (e)=> {
    const {name, value} = e.target;
    e.preventDefault();
    setUserDetails({...userDetails, [name]: value});
  }

  const onEditClick = (e)=> {
    e.preventDefault();
    setEdit(true);
  }

  const onEdit = (e)=> {
    e.preventDefault(e);
    dispatch(actionCreators.editprofile(userDetails));
    setEdit(false);
  }
  
  useEffect(()=> {
    if(!user) {
        navigate("/login", {replace: true});
    }
    else {
      dispatch(actionCreators.profile());
    }
  }, [user, navigate, dispatch]);
  return (
    <div className={styles.profile}>
        <div className={styles.nameDiv}>
          <h1 className={styles.head}>Profile</h1>
          <IconButton className={styles.editIconBtn} onClick={onEditClick}><EditIcon /></IconButton>
        </div>
        <div className={styles.profile_data}>
          <div className={styles.flexDiv}>
            <h2><label htmlFor="pname">Name:</label></h2>
            <input type="text" name="name" id='pname' value={userDetails.name} onChange={onChangeHandler} disabled={!edit} placeholder="Name" />
          </div>

          <div className={styles.flexDiv}>
            <h2><label htmlFor="pemail">Email:</label></h2>
            <input type="email" name="email" id='pemail' value={userDetails.email} onChange={onChangeHandler} disabled={!edit} placeholder="Email" />
          </div>

          <div className={styles.flexDiv}>
            <h2><label htmlFor="pphone">Phone:</label></h2>
            <input type="number" name="phone" id='pphone' value={userDetails.phone} onChange={onChangeHandler} disabled={!edit} placeholder="Phone" />
          </div>

          {edit && <div className={styles.btnDiv}>
            <button className={styles.editBtn} onClick={onEdit}>Edit</button>
            <button className={styles.cancelBtn} onClick={(e)=> {e.preventDefault(); setEdit(false);}}>Cancel</button>
          </div>}

        </div>
    </div>
  )
}

export default Profile;