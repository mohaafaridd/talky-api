import { Resolver, Query } from 'type-graphql'
import { Message } from '../entities/Message'

@Resolver()
export class MessageResolver {
  private messagesCollection: Message[] = []

  @Query(() => [Message])
  async chat(): Promise<Message[]> {
    return this.messagesCollection
  }
}
