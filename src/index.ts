import 'reflect-metadata'
import { ApolloServer, PubSub } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { MessageResolver } from './resolvers/MessageResolver'

const main = async () => {
  const schema = await buildSchema({ resolvers: [MessageResolver] })
  const pubsub = new PubSub()
  const server = new ApolloServer({ schema, context: () => ({ pubsub }) })

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main()
