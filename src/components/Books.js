import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS} from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState('All genres')

  const result = useQuery(ALL_BOOKS)
  
  if (!props.show || result.loading) {
    return null
  }
  const books = result.data.allBooks
  const authors = result.data.allAuthors
  
  let genreList = []
  books.forEach(book => {
    book.genres.forEach(genre => {
      genreList.push(genre)
    })
  })
  genreList = [...new Set(genreList)]

  return (
    <div>
      <h2>Books</h2>
      <p>In <b>{genre}</b></p>

        <div>
          Choose genre
          <label>
          <select value={genre} onChange={(event) => setGenre(event.target.value)}>
            <option value="All genres">All genres</option>
            {genreList.map(genre => 
              <option key={genre} value={genre}>{genre}</option>
            )}
          </select>
        </label>
        </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books
            .filter(b => b.genres.includes(genre) || genre === 'All genres')
            .map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{authors.find(a => a.id === b.author.id).name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books