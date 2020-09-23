import { IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";

export class CreateStockDto {
    @IsNotEmpty()
    code: string;

    @IsNotEmpty()
    company: string;

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