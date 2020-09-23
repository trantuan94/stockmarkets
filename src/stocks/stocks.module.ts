import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stock } from 'src/models/stock.entity';
import { StocksService } from './stocks.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stock])],
  providers: [StocksService],
  exports: [StocksService]
})
export class StocksModule {}
