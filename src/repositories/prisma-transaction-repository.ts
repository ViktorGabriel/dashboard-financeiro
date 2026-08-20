import { PrismaClient } from '../generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { ITransactionRepository } from './transaction-repository';
import { Transaction, CreateTransactionDTO, TransactionType, FilterTransactionsDTO } from '../domain/transaction';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

export class PrismaTransactionRepository implements ITransactionRepository {
    async create(dto: CreateTransactionDTO): Promise<Transaction> {
        const transaction = await prisma.transaction.create({
            data: {
                description: dto.description,
                amount: dto.amount,
                type: dto.type,
                category: dto.category,
            },
        });

        return {
            id: transaction.id,
            title: transaction.description,
            amount: transaction.amount,
            type: transaction.type as TransactionType,
            category: transaction.category,
            createdAt: transaction.createdAt,
        };
    }

    async findAll(filter?: FilterTransactionsDTO): Promise<Transaction[]> {
        const where: any = {};

        if (filter?.type) {
            where.type = filter.type;
        }

        if (filter?.category) {
            where.category = filter.category;
        }

        if (filter?.startDate || filter?.endDate) {
            where.createdAt = {};
            if (filter.startDate) {
                where.createdAt.gte = filter.startDate;
            }
            if (filter.endDate) {
                where.createdAt.lte = filter.endDate;
            }
        }

        const transactions = await prisma.transaction.findMany({ where });

        return transactions.map((t) => ({
            id: t.id,
            title: t.description,
            amount: t.amount,
            type: t.type as TransactionType,
            category: t.category,
            createdAt: t.createdAt,
        }));
    }


    async getSummary(): Promise<{ incomes: number; expenses: number; balance: number }> {
        const transactions = await prisma.transaction.findMany();

        let incomes = 0;
        let expenses = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === 'INCOME') {
                incomes += transaction.amount;
            } else if (transaction.type === 'EXPENSE') {
                expenses += transaction.amount;
            }
        });

        const balance = incomes - expenses;

        return {
            incomes,
            expenses,
            balance,
        };
    }
}