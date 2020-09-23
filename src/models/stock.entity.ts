import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, UpdateDateColumn } from "typeorm";

@Entity('stocks') // Cổ phiếu
export class Stock {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column({ unique: true })
    code: string;

    @Column()
    stockExchange: string;

    @Column()
    company: string;

    @Column()
    priceRef: number;
    
    @Column()
    priceCeil: number;
    
    @Column()
    priceFloor: number;
    
    @Column()
    sumVolume: number;

    @Column()
    bP3: number;

    @Column()
    bV3: number;

    @Column()
    bP2: number;
    
    @Column()
    bV2: number;
    
    @Column()
    bP1: number;
                        
    @Column()
    bV1: number;

    @Column()
    matchPrice: number;

    @Column()
    matchValue: number;

    @Column()
    changePrice: number;

    @Column()
    changePercent: number;

    @Column()
    highPrice: number;

    @Column()
    lowPrice: number;

    @Column()
    avgPrice: number;

    @Column()
    oP1: number;

    @Column()
    oV1: number;

    @Column()
    oP2: number;

    @Column()
    oV2: number;
                        
    @Column()
    oP3: number;

    @Column()
    oV3: number;

    @Column()
    remainBuyValue: number;

    @Column()
    remainSellValue: number;

    @Column()
    foreignBuyValue: number;

    @Column()
    foreignSellValue: number;

    @Column()
    foreignRoom: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}