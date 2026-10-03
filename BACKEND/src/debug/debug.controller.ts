import { Controller, Get } from '@nestjs/common';
import { Client } from 'pg';
import dns from 'node:dns/promises';

@Controller('debug')
export class DebugController {
  @Get('db')
  async testDatabase() {
    const connectionString = process.env.APP_DATABASE_URL;

    if (!connectionString) {
      return {
        ok: false,
        stage: 'env',
        error: 'APP_DATABASE_URL is missing',
      };
    }

    try {
      const url = new URL(connectionString);
      const host = url.hostname;
      const port = Number(url.port || 5432);

      const dnsResult = await dns.lookup(host, { family: 4 });

      const client = new Client({
        connectionString,
        connectionTimeoutMillis: 10000,
      });

      await client.connect();

      const result = await client.query(
        'SELECT current_user, current_database()',
      );

      await client.end();

      return {
        ok: true,
        
      };
    } catch (error: any) {
      return {
        ok: false,
        stage: 'connection',
        errorCode: error.code ?? null,
        errorMessage: error.message ?? String(error),
      };
    }
  }
}