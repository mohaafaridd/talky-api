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
import { MessageService } from '../services/messageService'

@Resolver()
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Query(() => [Message])
  async chat(@Arg('channel') channel: string): Promise<Message[]> {
    return this.messageService.getAll(channel)
  }

  @Mutation(() => Message)
  async sendMessage(
    @Arg('channel') channel: string,
    @Arg('content') content: string,
    @Arg('sender') sender: string,
    @PubSub() pubSub: PubSubEngine
  ): Promise<Message> {
    const message = await this.messageService.sendMessage(
      channel,
      content,
      sender
    )
    await pubSub.publish(channel, message)

    return message
  }

  // TODO | Args interface
  @Subscription({
    topics: ({ args }) => args.channel,
  })
  messageSent(@Root() chat: Message, @Arg('channel') channel: string): Message {
    // Just to shut up typescript compiler
    channel.length
    return chat
  }
}
