import React from 'react';
import './login.module.css';
import Form from '../../components/formComponent/Form';

const Login = () => {
  const fields = [
    { name: 'username', type: 'text', label: 'user name: ' },
    { name: 'password', type: 'password', label: 'Password: ' },
  ];

  return (
    <section>
      <h1>Login</h1>
      <Form fields={fields}>Login</Form>
    </section>
  );
};

export default Login;
