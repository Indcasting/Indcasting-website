import { Module } from '@nestjs/common';
import { CastingCallsController } from './casting-calls.controller';
import { CastingCallsService } from './casting-calls.service';

@Module({ controllers: [CastingCallsController], providers: [CastingCallsService] })
export class CastingCallsModule {}
