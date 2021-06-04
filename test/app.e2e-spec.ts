/* eslint-disable @typescript-eslint/no-empty-function */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { BulkService } from '../src/bulk.service';

describe('BulkController validation', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(BulkService)
      .useValue({
        sendRequest: () => {},
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('/bulk 400 invalid url', () => {
    return request(app.getHttpServer())
      .post('/bulk')
      .send({
        verb: 'GET',
        url: 'a',
        payload: [],
      })
      .expect(400);
  });

  it('/bulk 400 invalid verb', () => {
    return request(app.getHttpServer())
      .post('/bulk')
      .send({
        verb: 'g',
        url: 'https://guesty-user-service.herokuapp.com/user/{userId}',
        payload: [],
      })
      .expect(400);
  });

  it('/bulk 400 missing payload', () => {
    return request(app.getHttpServer())
      .post('/bulk')
      .send({
        verb: 'GET',
        url: 'https://guesty-user-service.herokuapp.com/user/{userId}',
      })
      .expect(400);
  });

  it('/bulk 201', () => {
    return request(app.getHttpServer())
      .post('/bulk')
      .send({
        verb: 'GET',
        url: 'https://guesty-user-service.herokuapp.com/user/{userId}',
        payload: [],
      })
      .expect(201);
  });
});
