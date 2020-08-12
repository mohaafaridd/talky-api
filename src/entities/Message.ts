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
  content!: string

  @Field()
  createDate!: Date
}
