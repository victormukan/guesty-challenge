import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUrl, IsEnum } from 'class-validator';

export class BulkRequestDto {
  @ApiProperty({
    default: 'https://guesty-user-service.herokuapp.com/user/{userId}',
  })
  @IsUrl()
  url: string;

  @ApiProperty({ default: 'PUT' })
  @IsEnum(['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
  verb: string;

  @ApiPropertyOptional({
    default: '[{ userId: 2 }]',
  })
  payload: any[];

  @ApiPropertyOptional({
    default: '[{ age: 30 }]',
  })
  body: any;
}
