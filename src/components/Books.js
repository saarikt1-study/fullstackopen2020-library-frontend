import React from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS} from '../queries'

const Books = (props) => {

  const result = useQuery(ALL_BOOKS)
  
  if (!props.show || result.loading) {
    return null
  }
  const books = result.data.allBooks
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>books</h2>

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
          {books.map(b =>
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