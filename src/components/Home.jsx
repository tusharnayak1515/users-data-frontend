import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionCreators } from '../redux';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { IconButton } from '@mui/material';

import styles from '../styles/home.module.css';
import Modal from './Modal';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const {data} = useSelector(state=> state.dataReducer,shallowEqual);
  const [show, setShow] = useState(false);

  useEffect(()=> {
    if(!user) {
        navigate("/login", {replace: true});
    }
    else {
        dispatch(actionCreators.getData());
    }
  }, [user, navigate, dispatch]);

  return (
    <div className={styles.home}>
        {show && <Modal setShow={setShow} />}
        <h1 className={styles.head}>My Data</h1>
        <IconButton className={styles.addIcon} onClick={(e)=> {e.preventDefault(); setShow(true)}}><AddCircleIcon fontSize='large' /></IconButton>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Domain</th>
                </tr>
            </thead>
            <tbody>
                {data && data.map((d)=> {
                    return(
                        <tr key={d._id}>
                            <td>{d.name}</td>
                            <td>{d.email}</td>
                            <td>+91{d.phone}</td>
                            <td>{d.domain}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
  )
}

export default Home;