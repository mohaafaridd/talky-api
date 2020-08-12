import { Resolver, Query, Arg, Mutation } from 'type-graphql'
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

  @Mutation(() => User, { nullable: true })
  async createUser(
    @Arg('name') name: string,
    @Arg('room') room: string
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

    return user
  }
}
