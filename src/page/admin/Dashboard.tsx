import React from 'react'
import Title from 'antd/es/typography/Title';
import { SendOutlined } from '@ant-design/icons';


type Props = {}

const Dashboard = (props: Props) => {
  return (
    <Title style={{textAlign: 'center', }} level={1} type='success' ><span><SendOutlined /></span> Chào mừng bạn trở lại trang Admin</Title>
  )
}

export default Dashboard