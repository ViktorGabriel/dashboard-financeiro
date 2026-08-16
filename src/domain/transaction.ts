export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
    id: string;
    title: string;
    amount: number; // o valor sempre será armazenado em centavos para evitar erros com números decimais
    type: TransactionType;
    createdAt: Date;
}
export interface CreateTransactionDTO {
    description: string;
    amount: number;
    type: TransactionType;
}