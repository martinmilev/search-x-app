import React from 'react'
import { Space } from 'antd'

const SearchResults = ({ results }) => results.map(result => (
  <Space direction="vertical" style={{ textAlign: 'left', width: '90%', marginTop: '20px' }} key={result.id}>
      <a href={`https://www.themoviedb.org/movie/${result.id}`} target="_blank">
        <strong>{result.title}</strong>
      </a>
      {result.overview}
  </Space>
))

export default SearchResults
