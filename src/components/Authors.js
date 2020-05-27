import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from '../queries'
import { useMutation } from '@apollo/client'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })
  
  const result = useQuery(ALL_AUTHORS)
  
  if (!props.show || result.loading || !result.data) {
    return null
  }
  const authors = result.data.allAuthors
  const books = result.data.allBooks

  const submit = async (event) => {
    event.preventDefault()
    
    editAuthor({  variables: { name, born } })

    setName('')
    setBorn('')
  }
  
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{books.filter(b => b.author.id === a.id).length}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          Name
          <label>
          <select value={name} onChange={(event) => setName(event.target.value)}>
            <option value="">Choose author...</option>
            {authors.map(author => 
              <option key={author.id} value={author.name}>{author.name}</option>
            )}
          </select>
        </label>
        </div>
        <div>
          Born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <button type='submit'>Update author</button>
      </form>
    </div>
  )
}

export default Authors