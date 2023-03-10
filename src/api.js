import axios from 'axios'

const apiUrl = 'https://api.themoviedb.org/3/search/movie'
const apiKey = 'd0681efa911f41d139343d0202e07b1f'

export const fetchSearchResults = (query = 'liar') =>
  axios(`${apiUrl}?api_key=${apiKey}&language=en-US&query=${query}`)
