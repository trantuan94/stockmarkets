import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stock } from 'src/models/stock.entity';
import { MongoRepository, ObjectID } from 'typeorm';
import { UpdateStockDto } from './dto/updateStock.dto';

@Injectable()
export class StocksService {
    public constructor(
        @InjectRepository(Stock) private stocksRepository: MongoRepository<Stock>
    ) {}

    public async getListStocks(): Promise<any> {
        return await this.stocksRepository.find();
    }

    public async addOrUpdateStock (stocksData: any[]): Promise<any> {
        const results = [];
        for (const stockDt of stocksData) {
            const existed = await this.stocksRepository.findOne({ code: stockDt.code })
            if (existed) {
                delete stockDt.code;
                const rs = await this.stocksRepository.update({ _id: existed._id }, stockDt);
                results.push(rs)
            } else {
                const rs = await this.stocksRepository.insert(stockDt)
                results.push(rs)
            }
        }

        return results;
    }

    public async updateStock(id: ObjectID, updateStockData: UpdateStockDto): Promise<any> {
        return await this.stocksRepository.findOneAndUpdate({id: { $eq: id }}, updateStockData);
    }
}
