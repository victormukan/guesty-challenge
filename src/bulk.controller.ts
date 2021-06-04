import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { BulkRequestDto } from './bulk.dto';
import { BulkService } from './bulk.service';
import { UtilService } from './util.service';

@Controller('bulk')
export class BulkController {
  constructor(
    private readonly bulkService: BulkService,
    private readonly utilService: UtilService,
  ) {}

  @Post()
  @ApiQuery({ name: 'detailed', required: false })
  @ApiCreatedResponse({
    type: BulkRequestDto,
    description: 'Perform bulk operation',
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
  })
  async bulk(@Body() body: BulkRequestDto, @Query('detailed') detailed) {
    const { payload } = body;

    if (!payload || !Array.isArray(payload)) {
      throw new BadRequestException('Missing payload or must be an array');
    }

    const urls = this.utilService.replaceUrlParams(body.url, body.payload);

    const responses = await Promise.all(
      urls.map((i) => this.bulkService.sendRequest(i, body.verb, body.body)),
    );

    return {
      statuses: responses.map((i) => i.statusCode),
      success: `${responses.filter((i) => !i.failed).length}/${
        responses.length
      }`,
      failed: `${responses.filter((i) => i.failed).length}/${responses.length}`,
      ...(detailed ? { responses } : {}),
    };
  }
}
