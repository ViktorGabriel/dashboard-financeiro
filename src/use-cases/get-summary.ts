import { inMemoryTransactionRepository } from "../repositories/in-memory-transaction-repository";

export default class GetSummaryUseCase {
    constructor(private repository:inMemoryTransactionRepository) { }

    execute() {
        return this.repository.getSummary()
    }
}