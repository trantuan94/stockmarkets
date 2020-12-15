
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { StocksService } from 'src/stocks/stocks.service';
import { InjectPage } from 'nest-puppeteer';
import type { Page } from 'puppeteer';

@Injectable()
export class CrawlStockDataService {

    private readonly logger = new Logger(CrawlStockDataService.name);
    constructor(
        @InjectPage() private page: Page,
        private stocksService: StocksService,
    ) {}

    @Cron('0 */2 * * * *')
    async handleCron(): Promise<any> {
        this.logger.log('running crawl stock data...');
        const urls = {
            HOSE: 'https://trade.vndirect.com.vn/chung-khoan/hose',
            HNX: 'https://trade.vndirect.com.vn/chung-khoan/hnx',
            UPCOM: 'https://trade.vndirect.com.vn/chung-khoan/upcom'
        }
        const stockExchanges = Object.keys(urls);
        let results = []
        for (const stockExchange of stockExchanges) {
            const rs = await this.crawlStockDataOnStockExchange(urls[stockExchange], stockExchange);
            if (rs && Array.isArray(rs)) {
                results = results.concat(rs);
            }
        }
        
        this.logger.log('finish crawl stock data (' + results.length + ').');
        return results
    }

    public async crawlStockDataOnStockExchange(url: string, stockExchange: string): Promise<any> {
        this.logger.log('stockExchange', stockExchange);
        await this.page.goto(url, { waitUntil: 'networkidle2' });
        let stocks = await this.page.evaluate(function () {
            const dataStocks = [];
            const trStocks = document.querySelectorAll('#banggia-khop-lenh-body > tr')
            if (trStocks) {
                for (const trStock of trStocks) {
                    const name = trStock.id
                    const tdElements = trStock.querySelectorAll('td');
                    if (!tdElements && tdElements.length === 0) {
                        continue;
                    }
                    const stockNameEle = tdElements[0].querySelector('a > span');
                    if (!stockNameEle) {
                        continue;
                    }
                    const stockName = tdElements[0].querySelector('a > span').innerHTML
                    const company = tdElements[0].dataset.tooltip;
                    const priceRefEle = tdElements[1].querySelector(`#${name}ref`);
                    const priceCeilEle = tdElements[2].querySelector(`#${name}ceil`);
                    const priceFloorEle = tdElements[3].querySelector(`#${name}floor`);
                    const sumVolumeEle = tdElements[4].querySelector(`#${name}tvol`);
                    const bP3Ele = tdElements[5].querySelector(`#${name}bP3`);
                    const bV3Ele = tdElements[6].querySelector(`#${name}bV3`);
                    const bP2Ele = tdElements[7].querySelector(`#${name}bP2`);
                    const bV2Ele = tdElements[8].querySelector(`#${name}bV2`);
                    const bP1Ele = tdElements[9].querySelector(`#${name}bP1`);
                    const bV1Ele = tdElements[10].querySelector(`#${name}bV1`);
                    const matchPriceEle = tdElements[11].querySelector(`#${name}matchP`);
                    const matchValueEle = tdElements[12].querySelector(`#${name}matchV`);
                    const changeOfPriceEle = tdElements[13].querySelector(`#${name}change`);
                    const changePercentEle = tdElements[13].querySelector(`#${name}percent`);
                    const oP1Ele = tdElements[14].querySelector(`#${name}oP1`);
                    const oV1Ele = tdElements[15].querySelector(`#${name}oV1`);
                    const oP2Ele = tdElements[16].querySelector(`#${name}oP2`);
                    const oV2Ele = tdElements[17].querySelector(`#${name}oV2`);
                    const oP3Ele = tdElements[18].querySelector(`#${name}oP3`);
                    const oV3Ele = tdElements[19].querySelector(`#${name}oV3`);
                    const highPriceEle = tdElements[20].querySelector(`#${name}highP`);
                    const avgPriceEle = tdElements[21].querySelector(`#${name}avgP`);
                    const lowPriceEle = tdElements[22].querySelector(`#${name}lowP`);
                    const remainBuyValueEle = tdElements[23].querySelector(`#${name}bV4`);
                    const remainSValueEle = tdElements[24].querySelector(`#${name}sV4`);
                    const foreingBuyValueEle = tdElements[25].querySelector(`#${name}foreignB`);
                    const foreignSellValueEle = tdElements[25].querySelector(`#${name}foreignS`)
                    const foreignRoomEle = tdElements[25].querySelector(`#${name}room`);

                    const priceRef = priceRefEle ? priceRefEle.innerHTML : null;
                    const priceCeil = priceCeilEle ? priceCeilEle.innerHTML : null;
                    const priceFloor = priceFloorEle ? priceFloorEle.innerHTML : null;
                    const sumVolume = sumVolumeEle ? sumVolumeEle.innerHTML : null;
                    const bP3 = bP3Ele ? bP3Ele.innerHTML : null;
                    const bV3 = bV3Ele ? bV3Ele.innerHTML : null;
                    const bP2 = bP2Ele ? bP2Ele.innerHTML : null;
                    const bV2 = bV2Ele ? bV2Ele.innerHTML : null;
                    const bP1 = bP1Ele ? bP1Ele.innerHTML : null;
                    const bV1 = bV1Ele ? bV1Ele.innerHTML : null;
                    const matchPrice = matchPriceEle ? matchPriceEle.innerHTML : null;
                    const matchValue = matchValueEle ? matchValueEle.innerHTML : null;
                    const changePrice = changeOfPriceEle ? changeOfPriceEle.innerHTML : null;
                    const changePercent = changePercentEle ? changePercentEle.innerHTML.replace('<small>%</small>  ', '').trim() : null;
                    const oP1 = oP1Ele ? oP1Ele.innerHTML : null;
                    const oV1 = oV1Ele ? oV1Ele.innerHTML : null;
                    const oP2 = oP2Ele ? oP2Ele.innerHTML : null;
                    const oV2 = oV2Ele ? oV2Ele.innerHTML : null;
                    const oP3 = oP3Ele ? oP3Ele.innerHTML : null;
                    const oV3 = oV3Ele ? oV3Ele.innerHTML : null;
                    const highPrice = highPriceEle ? highPriceEle.innerHTML : null;
                    const avgPrice = avgPriceEle ? avgPriceEle.innerHTML : null;
                    const lowPrice = lowPriceEle ? lowPriceEle.innerHTML : null;
                    const remainBuyValue = remainBuyValueEle ? remainBuyValueEle.innerHTML : null;
                    const remainSellValue = remainSValueEle ? remainSValueEle.innerHTML : null;
                    const foreignBuyValue = foreingBuyValueEle ? foreingBuyValueEle.innerHTML : null;
                    const foreignSellValue = foreignSellValueEle ? foreignSellValueEle.innerHTML : null;
                    const foreignRoom = foreignRoomEle ? foreignRoomEle.innerHTML : null

                    dataStocks.push({
                        code: stockName !== name ? stockName.replace('*', '') : stockName,
                        company: company || '',
                        priceRef: priceRef,
                        priceCeil: priceCeil,
                        priceFloor: priceFloor,
                        sumVolume: sumVolume,
                        bP3: bP3,
                        bV3: bV3,
                        bP2: bP2,
                        bV2: bV2,
                        bP1: bP1,
                        bV1: bV1,
                        matchPrice: matchPrice,
                        matchValue: matchValue,
                        changePrice: changePrice,
                        changePercent: changePercent,
                        oP1: oP1,
                        oV1: oV1,
                        oP2: oP2,
                        oV2: oV2,
                        oP3: oP3,
                        oV3: oV3,
                        highPrice: highPrice,
                        avgPrice: avgPrice,
                        lowPrice: lowPrice,
                        remainBuyValue: remainBuyValue,
                        remainSellValue: remainSellValue,
                        foreignBuyValue: foreignBuyValue,
                        foreignSellValue: foreignSellValue,
                        foreignRoom: foreignRoom
                    });
                }
            }

            return dataStocks;
        });
        stocks = stocks.map((dt) => {
            dt.sumVolume = this.convert2Number(dt.sumVolume);
            dt.stockExchange = stockExchange;
            dt.priceRef = this.convert2Number(dt.priceRef, 1000);
            dt.priceCeil = this.convert2Number(dt.priceCeil, 1000);
            dt.priceFloor = this.convert2Number(dt.priceFloor, 1000);
            dt.bP3 = this.convert2Number(dt.bP3, 1000);
            dt.bV3 = this.convert2Number(dt.bV3, 10);
            dt.bP2 = this.convert2Number(dt.bP2, 1000);
            dt.bV2 = this.convert2Number(dt.bV2, 10);
            dt.bP1 = this.convert2Number(dt.bP1, 1000);
            dt.bV1 = this.convert2Number(dt.bV1, 10);
            dt.matchPrice = this.convert2Number(dt.matchPrice, 1000);
            dt.matchValue = this.convert2Number(dt.matchValue);
            dt.changePrice = this.convert2Number(dt.changePrice, 1000);
            dt.changePercent = this.convert2Number(dt.changePercent, 1);
            dt.oP1 = this.convert2Number(dt.bV1, 1000);
            dt.oV1 = this.convert2Number(dt.bV1, 10);
            dt.oP2 = this.convert2Number(dt.bV1, 1000);
            dt.oV2 = this.convert2Number(dt.bV1, 10);
            dt.oP3 = this.convert2Number(dt.bV1, 1000);
            dt.oV3 = this.convert2Number(dt.bV1, 10);
            dt.highPrice = this.convert2Number(dt.highPrice, 1000);
            dt.lowPrice = this.convert2Number(dt.lowPrice, 1000)
            dt.avgPrice = this.convert2Number(dt.avgPrice, 1000);
            dt.remainBuyValue = this.convert2Number(dt.remainBuyValue, 10);
            dt.remainSellValue = this.convert2Number(dt.remainSellValue, 10);
            dt.foreignBuyValue = this.convert2Number(dt.foreignBuyValue, 10);
            dt.foreignSellValue = this.convert2Number(dt.foreignSellValue, 10);
            dt.foreignRoom = this.convert2Number(dt.foreignRoom, 10);
            return dt
        });
        const rs = await this.stocksService.addOrUpdateStock(stocks);

        return rs;
    }

    public convert2Number(strNumber: string, supplyNum = 10, separator = ','): number {
        if (separator !== '' && separator !== '' && typeof strNumber === 'string') {
            while(strNumber.includes(separator)) {
                strNumber = strNumber.replace(separator, '')
            }
            return parseFloat(strNumber) * supplyNum;
        } else {
            return null;
        }
    }
}