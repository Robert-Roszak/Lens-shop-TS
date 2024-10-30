import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button} from 'react-bootstrap';

import { useAppSelector } from '../../../redux/hooks';
import { useLoginUserMutation } from '../../../redux/userReduxApi';
import { LoginRequest } from '../../../types/interfaces';
import { validateEmail } from '../../../utils/utils';
import { clearLoginError } from '../../../redux/userRedux';

import styles from './Login.module.scss';

const Component: React.FC = () => {
  const [loginState, setLoginState] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const errorMessage = useAppSelector(state => state.user.errorMessage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearLoginError());
    
    if (validateEmail(email) && password) {    
      try {
        let url;
        loginState === 'login' ? url = '/login': url = '/register';
        const credentials:LoginRequest = {email, password, url};
        await loginUser(credentials).unwrap();
        navigate('/myorders');

      } catch (err) {
        console.error('Login failed', err);
      }
    } else alert('Please provided all details');
  };

  const changeState = (status: 'login' | 'register') => {
    setLoginState(status);
    dispatch(clearLoginError());
  };

  return (
    <Container className={styles.root} fluid={'md'}>
      <section>
        <Row className='justify-content-center'>
          <Col xs lg='5' className={styles.loginForm}>
            <b>{loginState === 'login' ? 'Login' : 'Register'}</b>
            <Form className={styles.form} onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" required placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                <Form.Text className={styles.emailText}>
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" required placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
              </Form.Group>
              <Button className={styles.submit} variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : loginState === 'login' ? 'Login' : 'Register'}
              </Button>
              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            </Form>
            {
              loginState === 'login' ? <p>Not registered yet? Click <span className={styles.registerText} onClick={() => changeState('register')}><b><u>here</u></b></span></p> 
                : <p><span className={styles.registerText} onClick={() => changeState('login')}><b><u>Back to login</u></b></span></p>
            }
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export {
  Component as Login,
  Component as LoginComponent,
};
