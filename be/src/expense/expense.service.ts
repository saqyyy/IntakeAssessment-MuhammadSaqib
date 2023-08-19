import { HttpException, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { Expense } from './entities/expense.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) { }
  async create(createExpenseDto: CreateExpenseDto, userId: number) {
    const data = await this.expenseRepository.save({
      ...createExpenseDto,
      userId
    });

    // transform image url
    if (data.picture) {
      data.picture = process.env.BACKEND_DOMAIN + "/image/" + data.picture;
    }

    return {
      message: 'Expense is created.',
      data
    };
  }

  async findAll() {
    const data = await this.expenseRepository.find({
      order: {
        id: "ASC"
      }
    });
    return data;
  }

  async findByUser(userId: number) {
    const data = await (await this.expenseRepository.find(
      {
        where: { userId },
        order: {
          id: "ASC"
        }
      }
    ));
    return data;
  }

  async updateStatus(id: number, updateExpenseDto: UpdateExpenseDto) {
    const { affected } = await this.expenseRepository.update(id, updateExpenseDto);

    if (!affected) throw new HttpException('Unable to Complete your Request', 409);

    return {
      message: "Status Updated Sucessfully"
    };
  }
}
