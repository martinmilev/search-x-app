import React from 'react'
import { Space, Typography } from 'antd'
const { Title } = Typography

const SearchResults = ({ results }) => results ? (
  <Space direction="vertical" style={{ textAlign: 'left' }}>
    <Title level={2}>{results.original_title}</Title>
    <Typography>{results.overview}</Typography>
  </Space>
) : (null)

export default SearchResults
