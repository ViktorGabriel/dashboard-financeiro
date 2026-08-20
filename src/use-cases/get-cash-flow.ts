import { ITransactionRepository } from '../repositories/transaction-repository';
import { FilterTransactionsDTO } from '../domain/transaction';
import { CashFlowPoint } from '../domain/analytics';

export class GetCashFlowUseCase {
    constructor(private repository: ITransactionRepository) {}

    async execute(filter?: FilterTransactionsDTO): Promise<CashFlowPoint[]> {
        const transactions = await this.repository.findAll(filter);

        const map = new Map<string, { incomes: number; expenses: number }>();

        for (const t of transactions) {
            const period = new Date(t.createdAt).toISOString().slice(0, 7); // "2026-08"

            if (!map.has(period)) {
                map.set(period, { incomes: 0, expenses: 0 });
            }

            const entry = map.get(period)!;
            if (t.type === 'INCOME') {
                entry.incomes += t.amount;
            } else if (t.type === 'EXPENSE') {
                entry.expenses += t.amount;
            }
        }

        return Array.from(map.entries())
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([period, { incomes, expenses }]) => ({
                period,
                incomes,
                expenses,
                balance: incomes - expenses,
            }));
    }
}
