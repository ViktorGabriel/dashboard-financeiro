import { CreateTransactionDTO, FilterTransactionsDTO, Transaction } from "../domain/transaction";
import { ITransactionRepository } from "./transaction-repository";

export class inMemoryTransactionRepository implements ITransactionRepository {
    private transactions: Transaction[] = [];

    async create(dto: CreateTransactionDTO) {
        const newTransaction: Transaction = {
            id: crypto.randomUUID(),
            title: dto.description,
            amount: dto.amount,
            type: dto.type,
            category: dto.category,
            createdAt: new Date(),
        };

        this.transactions.push(newTransaction);
        return newTransaction;
    }

    async findAll(filter?: FilterTransactionsDTO) {
        let result = [...this.transactions];

        if (filter?.type) {
            result = result.filter(t => t.type === filter.type);
        }
        if (filter?.category) {
            result = result.filter(t => t.category.toLowerCase() === filter.category!.toLowerCase());
        }
        if (filter?.startDate) {
            result = result.filter(t => t.createdAt >= filter.startDate!);
        }
        if (filter?.endDate) {
            result = result.filter(t => t.createdAt <= filter.endDate!);
        }

        return result;
    }

    async getSummary() {
        let incomes = 0;
        let expenses = 0;

        for (const transaction of this.transactions) {
            if (transaction.type === 'INCOME') {
                incomes += transaction.amount;
            } else if (transaction.type === 'EXPENSE') {
                expenses += transaction.amount;
            }
        }

        return { incomes, expenses, balance: incomes - expenses };
    }
}
