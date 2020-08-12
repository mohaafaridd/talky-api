import 'reflect-metadata'
import { ApolloServer, PubSub } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { Container } from 'typedi'
import { MessageResolver } from './resolvers/MessageResolver'
import { UserResolver } from './resolvers/UserResolver'

const main = async () => {
  const schema = await buildSchema({
    resolvers: [MessageResolver, UserResolver],
    container: Container,
  })
  const pubsub = new PubSub()

  const server = new ApolloServer({ schema, context: () => ({ pubsub }) })

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main()
