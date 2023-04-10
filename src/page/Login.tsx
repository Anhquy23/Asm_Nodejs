import React from 'react';
import { Button, Checkbox, Form, Input, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';

type Props = {}

const Login = (props: Props) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState([]);

  const onFinish = (values: any) => {
    axios.post('http://localhost:8081/api/sighin', values)
      .then((response) => {
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        localStorage.setItem('accessToken', response.data.accessToken);
        setCurrentUser(response.data.user);
        
        if (response.data.user.role === 'admin') {
          message.success('Chào mừng Admin đã quay trở lại!', 2);
          navigate('/admin');
        } else {
          message.success('Chúc mừng bạn đã đăng nhập thành công!', 2);
          navigate('/');
        }
      })
      .catch((error) => {
        console.log(error);
        message.error('Đăng nhập thất bại!', 2);
      });
  };
  // Một hàm xử lý khi form đăng nhập hoặc đăng ký thất bại
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo); // nhận vào tham số errorInfo là một đối tượng chứa thông tin về lỗi
  };



  return (
    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600, marginTop: 60 , marginLeft: 380 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[{ required: true, message: 'Please input your Email!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>


    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  )
}

export default Login
