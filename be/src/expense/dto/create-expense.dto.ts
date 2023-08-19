import { IsString, IsNumber, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateExpenseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    picture: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;
}
