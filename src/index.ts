import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { MessageResolver } from './resolvers/MessageResolver'

const main = async () => {
  const schema = await buildSchema({ resolvers: [MessageResolver] })

  const server = new ApolloServer({ schema })

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main()
