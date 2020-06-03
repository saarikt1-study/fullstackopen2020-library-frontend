import React from 'react'
import { useQuery } from '@apollo/client'
import { GET_CURRENT_USER, ALL_BOOKS } from '../queries'

const Recommendations = (props) => {

  const currentUser = useQuery(GET_CURRENT_USER)
  const result = useQuery(ALL_BOOKS)
  
  if (!props.show || result.loading) {
    return null
  }
  const favoriteGenre = currentUser.data.me.favoriteGenre
  const books = result.data.allBooks
  const authors = result.data.allAuthors
 

  return (
    <div>
      <h2>Recommendations</h2>
      <p>Here are some books in your favorite genre, <b>{favoriteGenre}</b></p>

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
            .filter(b => b.genres.includes(favoriteGenre))
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

export default Recommendations