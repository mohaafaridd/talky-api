import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class Message {
  @Field(() => ID)
  id!: number

  @Field()
  sender!: string

  @Field()
  channel!: string

  @Field()
  message!: string

  @Field()
  createDate!: Date
}
