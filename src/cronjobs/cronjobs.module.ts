import { Module } from '@nestjs/common';
import { StocksModule } from 'src/stocks/stocks.module';
import { CrawlStockDataService } from './CrawlStockData.service';
import { PuppeteerModule } from 'nest-puppeteer';

@Module({
    imports: [StocksModule, PuppeteerModule.forRoot()],
    providers: [CrawlStockDataService]
})
export class CronjobsModule {}
