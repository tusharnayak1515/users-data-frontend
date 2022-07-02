import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { actionCreators } from '../redux';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

import styles from '../styles/home.module.css';
import Modal from './Modal';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state=> state.userReducer,shallowEqual);
  const {data} = useSelector(state=> state.dataReducer,shallowEqual);
  const [show, setShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [editDetails, setEditDetails] = useState({id: "", name: "", email: "", phone: "", domain: ""});

  const onEdit = (e,id,name,email,phone,domain)=> {
    e.preventDefault();
    setEditDetails({id,name,email,phone,domain});
    setEditShow(true);
  }

  const onDelete = (e,id)=> {
    e.preventDefault();
    dispatch(actionCreators.deleteData(id));
  }

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
        {editShow && <Modal setShow={setEditShow} edit={true} id={editDetails.id} name={editDetails.name} email={editDetails.email} phone={editDetails.phone} domain={editDetails.domain} />}
        <h1 className={styles.head}>My Data</h1>
        <IconButton className={styles.addIcon} onClick={(e)=> {e.preventDefault(); setShow(true)}}><AddCircleIcon fontSize='large' /></IconButton>
        <table>
            <thead>
                <tr>
                    <th>Edit</th>
                    <th>Delete</th>
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
                            <td ><IconButton className={styles.editbtn} onClick={(e)=> onEdit(e,d._id,d.name,d.email,d.phone,d.domain)}><EditIcon /></IconButton></td>
                            <td ><IconButton className={styles.deletebtn} onClick={(e)=> onDelete(e,d._id)}><DeleteIcon /></IconButton></td>
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