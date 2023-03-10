import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { SearchOutlined } from '@ant-design/icons'
import { AutoComplete, Input, Typography, Space } from 'antd'
import { fetchSearchResults } from './api'

const { Title } = Typography

const App = () => {
  const [options, setOptions] = useState([])
  const [movies, setMovies] = useState([])
  const [movie, setMovie] = useState()
  const searchInput = useRef();

  useEffect(() => {
    if (searchInput.current) {
      searchInput.current.focus();
    }
  }, [searchInput]);

  const mutateQuery = useMutation(
    (string) => string && string.length > 2 && fetchSearchResults(string),
    {
      onSuccess: (resp) => {
        let resultData = {}
        resp?.data?.results.forEach((result) => resultData = { ...resultData, [result.original_title]: result })
        setOptions(Object.keys(resultData).map((key) => ({ value: key })).slice(0, 10) ?? [])
        setMovies(resultData)
      },
    }
  )

  return (
    <div>
      <Title class='enter'>Search X</Title>
      <AutoComplete
        options={options}
        onSelect={(text) => setMovie(movies[text])}
        onSearch={mutateQuery.mutate}
        onClear={() => setOptions([])}
      >
        <Input
          placeholder='Search here'
          ref={searchInput}
          enterButton
          allowClear
          prefix={<SearchOutlined className='site-form-item-icon' />}
        />
      </AutoComplete>
      {movie && (
        <Space direction="vertical" style={{ textAlign: 'left' }}>
          <Title level={2}>{movie.original_title}</Title>
          <Typography>{movie.overview}</Typography>
        </Space>
      )}
    </div>
  )
}

export default App
