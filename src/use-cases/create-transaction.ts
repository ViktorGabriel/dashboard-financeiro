import { CreateTransactionDTO, Transaction } from "../domain/transaction"
import { ITransactionRepository } from "../repositories/transaction-repository";

export class CreateTransactionUseCase {
    constructor(private repository: ITransactionRepository) { }

    async execute(dto: CreateTransactionDTO): Promise<Transaction> {
       if (!dto.description.trim()) {
            throw new Error("Descrição não pode ser vazia!")
       }

       if(dto.amount <= 0) {
        throw new Error("Valor deve ser maior que 0!")
       }

       if(!Number.isInteger(dto.amount)){
        throw new Error("O valor deve ser um número inteiro em centavos.")
       }

       const transaction = await this.repository.create(dto)

       return transaction
    }
}