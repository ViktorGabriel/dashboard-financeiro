export type TransactionType = 'INCOME' | 'EXPENSE';

export interface Transaction {
    id: string;
    title: string;
    amount: number; // o valor sempre será armazenado em centavos para evitar erros com números decimais
    type: TransactionType;
    createdAt: Date;
    category: string;
    userId: string;
}

export interface CreateTransactionDTO {
    description: string;
    amount: number;
    type: TransactionType;
    category: string;
    userId: string;
}

export interface FilterTransactionsDTO {
    type?: TransactionType;
    category?: string;
    startDate?: Date;
    endDate?: Date;
    userId?: string;
}
