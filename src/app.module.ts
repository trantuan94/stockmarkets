import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StocksModule } from './stocks/stocks.module';
import { CronjobsModule } from './cronjobs/cronjobs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ScheduleModule.forRoot(),
    StocksModule,
    CronjobsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
