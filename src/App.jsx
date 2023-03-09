import './App.css'
import React from 'react';
import { CloseOutlined, SearchOutlined } from '@ant-design/icons';
import { Input, Tooltip } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

const App = () => (
  <div>
    <Title>Search X</Title>
    <Input
      placeholder='Search'
      prefix={<SearchOutlined className='site-form-item-icon' />}
      suffix={
        <Tooltip title='Clear'>
          <CloseOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
        </Tooltip>
      }
    />
  </div>
)

export default App
