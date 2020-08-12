import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class Message {
  @Field(() => ID)
  id!: number

  @Field()
  name!: string

  @Field()
  room!: string

  @Field()
  joinDate!: Date
}
