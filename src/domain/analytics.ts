export interface CashFlowPoint {
    period: string;    // ex: "2026-08"
    incomes: number;
    expenses: number;
    balance: number;
}

export interface CategoryBreakdown {
    category: string;
    total: number;       // em centavos
    percentage: number;  // ex: 42.5 para 42,5%
}
