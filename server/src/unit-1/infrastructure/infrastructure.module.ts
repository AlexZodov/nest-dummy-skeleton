import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit1 } from '../domain';
import { Unit1Repository } from '../services';
import { TypeormUnit1Repository } from './repository';

@Module({
  imports: [TypeOrmModule.forFeature([Unit1])],
  providers: [
    {
      provide: Unit1Repository,
      useClass: TypeormUnit1Repository,
    },
  ],
  exports: [Unit1Repository],
})
export class InfrastructureModule {}
