import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TalentProfilesModule } from './talent-profiles/talent-profiles.module';
import { CastingCallsModule } from './casting-calls/casting-calls.module';
import { ApplicationsModule } from './applications/applications.module';
import { MessagingModule } from './messaging/messaging.module';
import { NotificationsModule } from './notifications/notifications.module';
import { MediaModule } from './media/media.module';
import { ReviewsModule } from './reviews/reviews.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, UsersModule, TalentProfilesModule, CastingCallsModule, ApplicationsModule, MessagingModule, NotificationsModule, MediaModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
