import { ITransactionRepository } from '../repositories/transaction-repository';
import { FilterTransactionsDTO } from '../domain/transaction';
import { CategoryBreakdown } from '../domain/analytics';

export class GetCategoryBreakdownUseCase {
    constructor(private repository: ITransactionRepository) {}

    async execute(filter?: FilterTransactionsDTO): Promise<CategoryBreakdown[]> {
        const expenses = await this.repository.findAll({
            ...filter,
            type: 'EXPENSE',
        });

        const totalGeral = expenses.reduce((sum, t) => sum + t.amount, 0);

        if (totalGeral === 0) {
            return [];
        }

        const categoryMap = new Map<string, number>();
        for (const t of expenses) {
            const prev = categoryMap.get(t.category) ?? 0;
            categoryMap.set(t.category, prev + t.amount);
        }

        return Array.from(categoryMap.entries())
            .map(([category, total]) => ({
                category,
                total,
                percentage: Math.round((total / totalGeral) * 1000) / 10,
            }))
            .sort((a, b) => b.total - a.total);
    }
}
