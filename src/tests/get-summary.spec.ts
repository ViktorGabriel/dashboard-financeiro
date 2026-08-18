import { describe, it,expect,beforeEach } from "vitest";
import { inMemoryTransactionRepository } from "../repositories/in-memory-transaction-repository"; 
import { CreateTransactionUseCase } from "../use-cases/create-transaction";
import GetSummaryUseCase from "../use-cases/get-summary";

describe('Financial Dashboard - Use Case',() =>{
    let repository:inMemoryTransactionRepository;
    let createTransactionUseCase:CreateTransactionUseCase;
    let getSummaryUseCase:GetSummaryUseCase;

    beforeEach(() =>{
        repository = new inMemoryTransactionRepository()
        createTransactionUseCase = new CreateTransactionUseCase(repository)
        getSummaryUseCase = new GetSummaryUseCase(repository)
    });

    it('deve calcular o resumo financeiro com receitas e despesas corretamente', () => {
        createTransactionUseCase.execute({ description: 'Salário', amount: 10000, type: 'INCOME' });
        createTransactionUseCase.execute({ description: 'Mercado', amount: 3000, type: 'EXPENSE' });

        const summary = getSummaryUseCase.execute();
        expect(summary.incomes).toBe(10000);
        expect(summary.expenses).toBe(3000);
        expect(summary.balance).toBe(7000);
    });
});
