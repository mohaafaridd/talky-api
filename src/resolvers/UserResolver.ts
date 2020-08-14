import {
  Resolver,
  Query,
  Arg,
  Mutation,
  PubSub,
  PubSubEngine,
} from 'type-graphql'
import { Service } from 'typedi'
import { User } from '../entities/User'
import { UserService } from '../services/userService'
import { MessageService } from '../services/messageService'

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly messageService: MessageService
  ) {}

  @Query(() => User, { nullable: true })
  async user(@Arg('name') name: string): Promise<User | null> {
    const user = await this.userService.getOne(name)

    if (!user) return null
    return user
  }

  @Query(() => [User])
  async users(
    @Arg('channel', { nullable: true }) channel: string
  ): Promise<User[]> {
    const users = await this.userService.getAll(channel)
    if (!users) return []
    return users
  }

  @Mutation(() => User, { nullable: true })
  async createUser(
    @Arg('name') name: string,
    @Arg('channel') channel: string,
    @PubSub() pubSub: PubSubEngine
  ): Promise<User | null> {
    const user = await this.userService.createOne(name, channel)

    const message = await this.messageService.sendMessage(
      channel,
      `${user?.name} has joined`,
      'ADMIN'
    )

    await pubSub.publish(channel, message)

    return user
  }

  @Mutation(() => Boolean)
  async removeUser(
    @Arg('name') name: string,
    @Arg('channel') channel: string,
    @PubSub() pubSub: PubSubEngine
  ): Promise<boolean> {
    const indication = await this.userService.deleteOne(name)

    const message = await this.messageService.sendMessage(
      channel,
      `${name} has left`,
      'ADMIN'
    )

    await pubSub.publish(channel, message)

    return indication
  }
}
