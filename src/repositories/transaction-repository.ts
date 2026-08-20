import { Transaction, CreateTransactionDTO, FilterTransactionsDTO } from "../domain/transaction";

export interface ITransactionRepository {
    create(transaction: CreateTransactionDTO): Promise<Transaction>
    findAll(filters?: FilterTransactionsDTO): Promise<Transaction[]>
    getSummary(): Promise<{ incomes: number, expenses: number, balance: number }>
}