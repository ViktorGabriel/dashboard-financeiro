import * as Transaction from "../domain/transaction";
import { ITransactionRepository } from "./transaction-repository";

export class inMemoryTransactionRepository implements ITransactionRepository {
    private transactions: Transaction.Transaction[] = [];

    async create(transaction: Transaction.CreateTransactionDTO) {
        const newTransaction: Transaction.Transaction = {
            id: crypto.randomUUID(),
            title: transaction.description,
            amount: transaction.amount,
            type: transaction.type,
            category: transaction.category || "Geral",
            createdAt: new Date(),
        };

        this.transactions.push(newTransaction);
        return newTransaction;
    }

    async findAll(filters?: Transaction.FilterTransactionsDTO) {
        let result = [...this.transactions];

        if (filters) {
            if (filters.type) {
                result = result.filter((t) => t.type === filters.type);
            }
            if (filters.category) {
                result = result.filter((t) => t.category === filters.category);
            }
            if (filters.startDate) {
                const start = new Date(filters.startDate);
                result = result.filter((t) => new Date(t.createdAt) >= start);
            }
            if (filters.endDate) {
                const end = new Date(filters.endDate);
                result = result.filter((t) => new Date(t.createdAt) <= end);
            }
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


