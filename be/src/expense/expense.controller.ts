import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/decorators/user.decorator';

@Controller('expense')
@UseGuards(JwtAuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Post()
  create(@Body() createExpenseDto: CreateExpenseDto, @User() user: any) {
    return this.expenseService.create(createExpenseDto, user.id);
  }

  @Get()
  findAll() {
    return this.expenseService.findAll();
  }

  @Get('user')
  findByUser(@User() user: any) {
    return this.expenseService.findByUser(user.id);
  }

  @Patch(':id')
  updateStatus(@Param('id') id: number, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expenseService.updateStatus(id, updateExpenseDto);
  }

}
