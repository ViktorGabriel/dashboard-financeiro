import { CreateTransactionDTO, Transaction } from "../domain/transaction"
import { inMemoryTransactionRepository } from "../repositories/in-memory-transaction-repository";

export class CreateTransactionUseCase {
    constructor(private repository: inMemoryTransactionRepository) { }

    execute(dto: CreateTransactionDTO) {
       if (dto.description.trim()) {
            throw new Error("Descrição não pode ser vazia!")
       }

       if(dto.amount <= 0) {
        throw new Error("Valor deve ser maior que 0!")
       }

       if(!Number.isInteger(dto.amount)){
        throw new Error("O valor deve ser um número inteiro em centavos.")
       }

       const transaction = this.repository.create(dto)

       return transaction
    }
}