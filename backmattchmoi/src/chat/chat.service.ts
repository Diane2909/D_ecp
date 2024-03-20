/*import { Injectable } from '@nestjs/common';
import { throwError } from 'rxjs';
import { HttpService } from '@nestjs/axios';
@Injectable()
export class ChatService {
  private readonly chatServerUrl = 'http://localhost:3001/chat';

  constructor(private httpService: HttpService) {}

  async createConversation(matchId: string, userIds: string[]): Promise<any> {
    const conversationEndpoint = `${this.chatServerUrl}/conversations`;
    return this.httpService
      .post(conversationEndpoint, {
        matchId,
        userIds,
      })
      .toPromise()
      .then((response) => response.data)
      .catch((error) => {
        console.error('Error when calling chat service:', error);
        return throwError(() => new Error('Error when calling chat service'));
      });
  }
}
*/
