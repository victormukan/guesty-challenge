import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class BulkService {
  async sendRequest(url: string, method: string, body: any) {
    try {
      const response = await axios({
        url,
        method: method as any,
        data: JSON.stringify(body),
      });

      return {
        url,
        statusCode: response.status,
        response: response.data,
        failed: false,
      };
    } catch (err) {
      return {
        url,
        statusCode: err.response.status,
        response: err.response.data,
        failed: true,
      };
    }
  }
}
