import { Resolver, Query, Arg } from 'type-graphql'
import { BinarySearchTree } from '../datastructure/BinarySearchTree'
import { User } from '../entities/User'

@Resolver()
export class UserResolver {
  private usersCollection = new BinarySearchTree<User>()

  @Query(() => User, { nullable: true })
  async user(@Arg('name') name: string): Promise<User | null> {
    const user = this.usersCollection.find(name)
    if (!user) return null
    return user
  }
}
