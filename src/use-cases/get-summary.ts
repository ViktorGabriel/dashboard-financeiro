import { ITransactionRepository } from "../repositories/transaction-repository";

export class GetSummaryUseCase {
    constructor(private repository: ITransactionRepository) { }

    async execute() {
        return await this.repository.getSummary();
    }
}