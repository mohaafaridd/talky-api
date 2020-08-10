import { Resolver, Query, Mutation, Arg } from 'type-graphql'
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
    @Arg('message') message: string
  ): Promise<Message> {
    const createdMessage: Message = {
      id: this.messagesCollection.length + 1,
      sender,
      message,
      createDate: new Date(),
    }

    this.messagesCollection.push(createdMessage)

    return createdMessage
  }
}
