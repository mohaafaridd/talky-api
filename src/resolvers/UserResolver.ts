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
  async users(@Arg('room', { nullable: true }) room: string): Promise<User[]> {
    const users = await this.userService.getAll(room)
    if (!users) return []
    return users
  }

  @Mutation(() => User, { nullable: true })
  async createUser(
    @Arg('name') name: string,
    @Arg('room') room: string,
    @PubSub() pubSub: PubSubEngine
  ): Promise<User | null> {
    const user = await this.userService.createOne(name, room)

    await pubSub.publish(room, user)

    return user
  }

  @Subscription({
    topics: ({ args }) => args.room,
  })
  userJoined(@Root() user: User, @Arg('room') room: string): User {
    // Just to shut up typescript compiler
    room.length
    return user
  }
}
