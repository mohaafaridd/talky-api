import {
  Resolver,
  Query,
  Arg,
  Mutation,
  Subscription,
  Root,
  PubSub,
  PubSubEngine,
} from 'type-graphql'
import { Service } from 'typedi'
import { User } from '../entities/User'
import { UserService } from '../services/userService'

@Service()
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

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

    await pubSub.publish(channel, user)

    return user
  }

  @Subscription({
    topics: ({ args }) => args.channel,
  })
  userJoined(@Root() user: User, @Arg('channel') channel: string): User {
    // Just to shut up typescript compiler
    channel.length
    return user
  }
}
