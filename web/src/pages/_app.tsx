import * as React from 'react'
import '../../styles/globals.css'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

const client = new ApolloClient({ 
  uri: 'http://localhost:4000/graphql',
  credentials: 'include'
})

function MyApp({ Component, pageProps }: any) {
  return (
    <>
     <ApolloProvider client={client}>
      <Component {...pageProps} />
     </ApolloProvider>
    </>
  ) 
}

export default MyApp
