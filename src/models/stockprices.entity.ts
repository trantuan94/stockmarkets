import { CreateDateColumn, Entity, ObjectIdColumn, ObjectID, Column, UpdateDateColumn } from 'typeorm';
@Entity('stockprices')
export class StockPrice {
    @ObjectIdColumn()
    _id: ObjectID;

    @ObjectIdColumn()
    stockId: ObjectID;

    @Column()
    time: string; // Ngày giao dịch

    @Column()
    type: string;

    @Column()
    priceRef: number; // Giá tham chiếu

    @Column()
    priceCeil: number; // Giá trần

    @Column()
    priceFloor: number; // Giá sàn

    @Column()
    highPrice: number; // Giá cao nhất

    @Column()
    lowPrice: number; // Giá thấp nhất

    @Column()
    avgPrice: number; // Giá TB 

    @Column()
    atoPrice: number; // Giá mở của

    @Column()
    atcPrice: number; // Giá đóng cửa

    @Column()
    sumVolume: number; // Khối lượng giao dịch

    @Column()
    foreignBuyValue: number; // Khối ngoại mua

    @Column()
    foreignSellValue: number; // Khối ngoại bán

    @Column()
    foreignRoom: number; // Room Khối ngoại

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}