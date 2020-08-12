import { Inject, Service } from 'typedi'
import { Message } from '../entities/Message'

@Service()
export class MessageService {
  @Inject('MESSAGE_SERVICE')
  private messagesCollection: Message[] = []

  async getAll(channel: string): Promise<Message[] | null> {
    return this.messagesCollection.filter(
      (message) => message.channel === channel
    )
  }

  public async sendMessage(
    sender: string,
    channel: string,
    content: string
  ): Promise<Message> {
    const createdMessage: Message = {
      id: this.messagesCollection.length + 1,
      sender,
      channel,
      content,
      createDate: new Date(),
    }

    this.messagesCollection.push(createdMessage)

    return createdMessage
  }
}
