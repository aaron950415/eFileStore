import React from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { useStores } from '../stores';
import { useHistory } from 'react-router-dom';


const Wraper = styled.div`
  max-width: 600px;
  margin: 30px auto;
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
`;


const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 18,
  },
};

const Component = () => {

  const { AuthStore } = useStores();
  const history = useHistory();

  const onFinish = values => {
    AuthStore.setUsername(values.username);
    AuthStore.setPassword(values.password);
    AuthStore.login()
      .then(() => {
        history.push('/');
      })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const validateUsername = (rule, value) => {
    if(/\W/.test(value)) return Promise.reject('只能是字母数字下划线');
    if(value.length < 4 || value.length > 10) return Promise.reject('长度为4～10个字符');
    return Promise.resolve();
  };
  



  return (
    <Wraper>
    <Title>Login</Title>
    <Form
    {...layout}
    name="basic"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[
        {
          required: true,
          message: 'Please input your username!',
        },
        {
          validator: validateUsername
        }
      ]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
        {
          min: 4,
          message: 'at least 4 character'
        }, 
        {
          max: 10,
          message: 'no more than 10 character'
        }
      ]}
    >
      <Input.Password />
    </Form.Item>



      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
      </Form.Item>
    </Form>
    </Wraper>
  );
};

export default Component;