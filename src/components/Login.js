import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN, ALL_AUTHORS, ALL_BOOKS} from '../queries'

const Login = (props) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  // const [ login ] = useMutation(LOGIN, {
  //   refetchQueries: [ { query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  // })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log("Login with ", name, password)

    setName('')
    setPassword('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          Name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          Password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login