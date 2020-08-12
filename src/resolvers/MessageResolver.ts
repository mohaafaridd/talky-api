import {
  Resolver,
  Query,
  Mutation,
  Arg,
  PubSub,
  Subscription,
  Root,
  PubSubEngine,
} from 'type-graphql'
import { Message } from '../entities/Message'

@Resolver()
export class MessageResolver {
  private messagesCollection: Message[] = []

  @Query(() => [Message])
  async chat(): Promise<Message[]> {
    return this.messagesCollection
  }

  @Mutation(() => Message)
  async sendMessage(
    @Arg('sender') sender: string,
    @Arg('message') message: string,
    @Arg('channel') channel: string,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Message> {
    const createdMessage: Message = {
      id: this.messagesCollection.length + 1,
      sender,
      message,
      createDate: new Date(),
    }

    this.messagesCollection.push(createdMessage)
    await pubSub.publish(channel, createdMessage)

    return createdMessage
  }

  // TODO | Args interface
  @Subscription({
    topics: ({ args }) => args.topic,
  })
  messageSent(@Root() chat: Message, @Arg('topic') topic: string): Message {
    // Just to shut up typescript compiler
    topic.length
    return chat
  }
}
