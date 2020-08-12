import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class User {
  @Field(() => ID)
  id!: number

  @Field()
  name!: string

  @Field()
  channel!: string

  @Field()
  joinDate!: Date
}
