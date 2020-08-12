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
import { BinarySearchTree } from '../datastructure/BinarySearchTree'
import { User } from '../entities/User'

@Resolver()
export class UserResolver {
  private count = 0
  private usersCollection = new BinarySearchTree<User>()

  @Query(() => User, { nullable: true })
  async user(@Arg('name') name: string): Promise<User | null> {
    const user = this.usersCollection.find(name)
    if (!user) return null
    return user
  }

  @Query(() => [User])
  async users(@Arg('room', { nullable: true }) room: string): Promise<User[]> {
    const users = this.usersCollection.dfsInOrder(room)
    if (!users) return []
    return users
  }

  @Mutation(() => User, { nullable: true })
  async createUser(
    @Arg('name') name: string,
    @Arg('room') room: string,
    @PubSub() pubSub: PubSubEngine
  ): Promise<User | null> {
    const userExists = this.usersCollection.find(name)

    if (userExists) throw new Error('Username already exist')

    const user: User = {
      id: this.count++,
      name,
      room,
      joinDate: new Date(),
    }

    this.usersCollection.insert(user)
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
