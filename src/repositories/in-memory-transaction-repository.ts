import { title } from "process";
import * as Transaction from "../domain/transaction";

class inMemoryTransactionRepository {
    private transactions: Transaction.Transaction[]= [];
    

    async create(transaction: Transaction.CreateTransactionDTO) {
        
        const newTransaction = {
            id: crypto.randomUUID(),
            title:transaction.description,
            amount: transaction.amount,
            type:transaction.type,
            createdAt:new Date()
            
           
                
        }
       
        this.transactions.push(newTransaction);
        return newTransaction
        
    }
    async findAll() {
        return [...this.transactions]
    }

    async getSummary() {
        let incomes = 0;
        let expenses = 0;

        for (const transaction of this.transactions) {
            if(transaction.type === 'INCOME') {
                incomes += transaction.amount
            }else if(transaction.type === 'EXPENSE'){
                expenses += transaction.amount
            }
        }
    }
    
   
}

