import 'dotenv/config';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../generated/prisma';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,

  ssl: {
    rejectUnauthorized: false,
  },

  // How long to wait when establishing a DB connection
  connectionTimeoutMillis: 10_000,

  // Close idle connections instead of keeping them around
  idleTimeoutMillis: 30_000,

  // Keep the application-side pool small.
  // Your development backend does not need 10 connections.
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