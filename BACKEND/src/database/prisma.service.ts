import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // Connection is established lazily by Prisma.
    // Keep startup independent of the database until DATABASE_URL is configured.
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
