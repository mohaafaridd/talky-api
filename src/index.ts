import { ApolloServer, gql } from 'apollo-server'

const typeDefs = gql`
  type Query {
    initialQuery: String
  }
`

const resolvers = {
  Query: {
    initialQuery: () => 'Initial Query',
  },
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
