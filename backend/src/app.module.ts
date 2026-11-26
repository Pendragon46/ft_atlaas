import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ArtworkModule } from './artwork/artwork.module';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { FollowModule } from './follow/follow.module';
import { LikesModule } from './likes/likes.module';
import { HealthService } from './health/health.service';
import { HealthModule } from './health/health.module';
import { MetricsModule } from './metrics/metrics.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { MetricsInterceptor } from './metrics/metrics.interceptor';
import { CommentModule } from './comment/comment.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { SearchModule } from './search/search.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { FriendsModule } from './friends/friends.module';
import { OnlineStatusModule } from './websocket/onlineStatus.module';
import { WebsocketModule } from './websocket/websocket.module';
import { ChatModule } from './chat/chat.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../frontend/dist'),
    }),
    PrismaModule,
    UsersModule,
    ArtworkModule,
    CloudinaryModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([{ ttl: 10000, limit: 20 }]),
    MulterModule.register({ storage: memoryStorage() }),
    FollowModule,
    LikesModule,
    	HealthModule,
    CommentModule,
    AuthModule,
    SearchModule,
    FriendsModule,
    OnlineStatusModule,
    WebsocketModule,
    ChatModule,
  	MetricsModule],
  providers: [
    AppService,
    CloudinaryService,
    HealthService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  { provide: APP_INTERCEPTOR, useClass: MetricsInterceptor }],
})
export class AppModule {}
