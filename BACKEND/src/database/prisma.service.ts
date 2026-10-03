import 'dotenv/config';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma';

const connectionString = process.env.APP_DATABASE_URL;

if (!connectionString) {
  throw new Error('APP_DATABASE_URL is required');
}

const adapter = new PrismaPg({
  connectionString,

  ssl: {
    rejectUnauthorized: false,
  },

  connectionTimeoutMillis: 10_000,
  idleTimeoutMillis: 30_000,
  max: 3,
});

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy
{
  constructor() {
    super({
      adapter,
    });
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}