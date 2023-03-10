import './App.css'
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { CloseOutlined, SearchOutlined } from '@ant-design/icons'
import { AutoComplete, Input, Tooltip, Typography, Space, Card } from 'antd'

import { fetchSearchResults } from './api'

const { Title } = Typography

const App = () => {
  const [options, setOptions] = useState([])
  const [movies, setMovies] = useState([])
  const [movie, setMovie] = useState({})

  const mutateQuery = useMutation(
    (string) => string && string.length > 2 && fetchSearchResults(string),
    {
      onSuccess: (resp) => {
        let resultData = {}
        resp?.data?.results.forEach((result) => resultData = { ...resultData, [result.original_title]: result })
        setOptions(Object.keys(resultData).map((key) => ({ value: key })) ?? [])
        setMovies(resultData)
      },
    }
  )

  return (
    <div>
      <Title>Search X</Title>
      <AutoComplete
        options={options}
        onSelect={(text) => setMovie(movies[text])}
        onSearch={mutateQuery.mutate}
      >
        <Input
          placeholder='Search here'
          enterButton
          focus
          prefix={<SearchOutlined className='site-form-item-icon' />}
          suffix={
            <Tooltip title='Clear'>
              <CloseOutlined style={{ color: 'rgba(0,0,0,.45)' }} />
            </Tooltip>
          }
        />
      </AutoComplete>
      {movie && (
        <Space direction='vertical' size='middle' style={{ display: 'flex' }}>
          <Card title={movie.original_title} size='small'>
            <p>{movie.popularity}</p>
            <p>{movie.release_date}</p>
            <p>{movie.overview}</p>
          </Card>
        </Space>
      )}
    </div>
  )
}

export default App
