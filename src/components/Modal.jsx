import React, { useState } from 'react';
import reactDom from "react-dom";
import { useDispatch } from 'react-redux';
import { actionCreators } from '../redux';

import styles from '../styles/modal.module.css';

const Modal = ({ edit, id, name, email, phone, domain, setShow }) => {
  const [mydata, setMyData] = useState({id: id ? id : null, name: name ? name : "", email: email ? email : "", phone: phone ? phone : "", domain: domain ? domain : ""});
  const dispatch = useDispatch();

  const onChangeHandler = (e)=> {
    const {name, value} = e.target;
    e.preventDefault();
    setMyData({...mydata, [name]: value});
  }

  const onAdd = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.addData(mydata));
    setShow(false);
  }

  const onEdit = (e)=> {
    e.preventDefault();
    dispatch(actionCreators.editData(mydata));
    setShow(false);
  }

  const onCancel = (e)=> {
    e.preventDefault();
    setShow(false);
  }

  return reactDom.createPortal (
    <>
    <div className={styles.backdrop}>
        <div className={styles.modal}>
            <h1 className={styles.head}>{edit ? 'Edit Data' : 'Add Data'}</h1>
            <input type="text" name="name" value={mydata.name} onChange={onChangeHandler} placeholder="Name" />
            <input type="email" name="email" value={mydata.email} onChange={onChangeHandler} placeholder="Email" />
            <input type="number" name="phone" value={mydata.phone} onChange={onChangeHandler} placeholder="Phone" />
            <input type="text" name="domain" value={mydata.domain} onChange={onChangeHandler} placeholder="Domain" />
            <button className={styles.togglebtn} onClick={edit ? onEdit : onAdd}>{edit ? 'Edit' : 'Add'}</button>
            <button className={styles.cancelbtn} onClick={onCancel}>Cancel</button>
        </div>
    </div>
    </>,
    document.getElementById("modal-root")
  )
}

export default Modal;