import { Transaction, CreateTransactionDTO } from "../domain/transaction";

export interface ITransactionRepository {
    create(transaction: CreateTransactionDTO): Promise<Transaction>
    findAll(): Promise<Transaction[]>
    getSummary(): Promise<{ incomes: number, expenses: number, balance: number }>
}