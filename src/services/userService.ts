import { Service, Inject } from 'typedi'
import { User } from '../entities/User'
import { BinarySearchTree } from '../datastructure/BinarySearchTree'

@Service()
export class UserService {
  @Inject('USER_SERVICE')
  private readonly usersCollection = new BinarySearchTree<User>()
  private count = 0

  async getAll(): Promise<User[] | null> {
    return this.usersCollection.dfsInOrder()
  }

  async getOne(name: string): Promise<User | null> {
    return this.usersCollection.find(name)
  }

  async createOne(name: string, room: string): Promise<User | null> {
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
