import { IsString, IsNumber, IsOptional, IsNotEmpty, IsEnum } from 'class-validator';
import { ExpenseStatus } from 'src/constants/status.enum';

export class UpdateExpenseDto {
    @IsEnum(ExpenseStatus)
    @IsNotEmpty()
    status: ExpenseStatus;
}

