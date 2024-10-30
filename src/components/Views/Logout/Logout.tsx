import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../../redux/userRedux';
import { Container} from 'react-bootstrap';
import styles from './Logout.module.scss';

const Component: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate('/');
  },[]);

  return (
    <Container className={styles.root} fluid={'md'}/>
  );
};

export {
  Component as Logout,
  Component as LogoutComponent,
};
