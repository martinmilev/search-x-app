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
  const [movies, setMovies] = useState([])
  const [movie, setMovie] = useState()

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
      <div>
      <Title>Search X</Title>
      <SearchAutocomplete 
       options={options}
        onSelect={(text) => setMovie(movies[text])}
        onSearch={mutateQuery.mutate}
        />
      </div>
      <SearchResults results={movie} />
    </div>
  )
}

export default App
