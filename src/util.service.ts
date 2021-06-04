import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilService {
  replaceUrlParams(url: string, params: any[]) {
    const replaceVariables = url.match(/[^{\}]+(?=})/g);

    return params.map((i) => {
      let result = url;

      replaceVariables.forEach((replace) => {
        result = result.replace(`{${replace}}`, i[replace] || '');
      });

      return result;
    });
  }
}
