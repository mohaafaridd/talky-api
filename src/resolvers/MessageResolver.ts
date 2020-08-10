import {
  Resolver,
  Query,
  Mutation,
  Arg,
  PubSub,
  Subscription,
  Root,
  Publisher,
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
    @PubSub('chat') pubSub: Publisher<Message>
  ): Promise<Message> {
    const createdMessage: Message = {
      id: this.messagesCollection.length + 1,
      sender,
      message,
      createDate: new Date(),
    }

    this.messagesCollection.push(createdMessage)
    await pubSub(createdMessage)

    return createdMessage
  }

  @Subscription({
    topics: 'chat',
  })
  messageSent(@Root() chat: Message): Message {
    return chat
  }
}
