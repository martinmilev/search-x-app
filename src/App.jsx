import './App.css'
import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { SearchAutocomplete } from './components/search-autocomplete'
import { SearchResults } from './components/search-results'
import { Typography } from 'antd'
import { fetchSearchResults } from './api'

const { Title } = Typography

const App = () => {
  const [options, setOptions] = useState([])
  const [result, setResult] = useState([])
  const [movies, setMovies] = useState([])

  const mutateQuery = useMutation(
    (string) => string && string.length > 2 && fetchSearchResults(string),
    {
      onSuccess: (resp) => {
        let resultData = {}
        resp?.data?.results.forEach((result) => resultData = { ...resultData, [result.title]: result })
        setOptions(Object.keys(resultData).map((key) => ({ value: key })).slice(0, 10) ?? [])
        setResult(resultData)
      },
    }
  )

  const onSelect = (text) => {
    const selected = []
    Object.keys(result).forEach((key) => result[key].title.includes(text) && selected.push(result[key]))
    setMovies(selected)
  }

  return (
    <div>
      <div>
        <Title>Search X</Title>
        <SearchAutocomplete
          options={options}
          onSelect={onSelect}
          onSearch={mutateQuery.mutate}
        />
      </div>
      <SearchResults results={movies} />
    </div>
  )
}

export default App
