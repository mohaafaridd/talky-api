import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType()
export class Message {
  @Field(() => ID)
  id!: string

  @Field()
  sender!: string

  @Field()
  message!: string

  @Field()
  createDate!: Date
}
