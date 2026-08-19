import { PrismaClient } from '../generated/prisma/client';
import { ITransactionRepository } from './transaction-repository';
import { Transaction, CreateTransactionDTO, TransactionType } from '../domain/transaction';

const prisma = new PrismaClient();

export class PrismaTransactionRepository implements ITransactionRepository {
    async create(dto: CreateTransactionDTO): Promise<Transaction> {
        const transaction = await prisma.transaction.create({
            data: {
                description: dto.description,
                amount: dto.amount,
                type: dto.type,
            },
        });

        return {
            id: transaction.id,
            title: transaction.description,
            amount: transaction.amount,
            type: transaction.type as TransactionType,
            createdAt: transaction.createdAt,
        };
    }

    async findAll(): Promise<Transaction[]> {
        const transactions = await prisma.transaction.findMany();

        return transactions.map((t) => ({
            id: t.id,
            title: t.description,
            amount: t.amount,
            type: t.type as TransactionType,
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