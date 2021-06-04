import { Module } from '@nestjs/common';
import { BulkController } from './bulk.controller';
import { BulkService } from './bulk.service';
import { UtilService } from './util.service';

@Module({
  imports: [],
  controllers: [BulkController],
  providers: [BulkService, UtilService],
})
export class AppModule {}
