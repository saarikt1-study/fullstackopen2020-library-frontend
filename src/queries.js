import { gql  } from '@apollo/client'

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(
      name: $name,
      born: $born
    ) {
      name,
      born
    }
  }
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
    ) {
      title
      published
      genres
    }
  }
  `
  
  export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password)  {
        value
      }
    }
  `
  
  export const GET_CURRENT_USER = gql`
    query {
      me {
        username
        favoriteGenre
      }
    }
  `

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      published
      genres
      author { id }
    }
    allAuthors {
      name,
      born,
      id
    }
  }
`
export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      id
      bookCount
    }
    allBooks {
      title,
      published,
      author { id }
    }
  }
`

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    genres 
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`