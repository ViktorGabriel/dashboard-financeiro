import * as Transaction from "../domain/transaction";

export class inMemoryTransactionRepository {
    private transactions: Transaction.Transaction[]= [];
    

    create(transaction: Transaction.CreateTransactionDTO) {
        
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
    findAll() {
        return [...this.transactions]
    }

    getSummary() {
        let incomes = 0;
        let expenses = 0;

        for (const transaction of this.transactions) {
            if(transaction.type === 'INCOME') {
                incomes += transaction.amount
            }else if(transaction.type === 'EXPENSE'){
                expenses += transaction.amount
            }
        }

        return { incomes, expenses, balance: incomes - expenses };
    }
    
   
}

