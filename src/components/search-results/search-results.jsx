import React from 'react'
import { Space, Typography } from 'antd'
const { Title } = Typography

const SearchResults = ({ results }) => results.map(result => (
  <Space direction="vertical" style={{ textAlign: 'left', width: '100%' }} key={result.id}>
    <Title level={3}>{result.title}</Title>
    <Typography>{result.overview}</Typography>
  </Space>
))

export default SearchResults
