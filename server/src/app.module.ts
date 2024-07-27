import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from './config';
import { DatabaseModule } from './common/database';
import { Unit1Module } from './unit-1/unit1.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        typeorm: {
          type: 'postgres',
          replication: {
            master: { url: configService.database.url },
            slaves: configService.database.replicas.map((url) => ({ url })),
          },
        },
      }),
    }),
    Unit1Module,
  ],
})
export class AppModule {}
