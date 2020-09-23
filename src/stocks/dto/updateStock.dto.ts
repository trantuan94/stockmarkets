import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateStockDto {
    @IsString()
    @IsOptional()
    stockExchange: string;

    @IsNumber()
    @IsOptional()
    currentPrice: number;

    @IsNumber()
    @IsOptional()
    highestPrice: number;

    @IsNumber()
    @IsOptional()
    lowestPrice: number;

    @IsNumber()
    @IsOptional()
    atoPrice: number;

    @IsNumber()
    @IsOptional()
    atcPrice: number;

}