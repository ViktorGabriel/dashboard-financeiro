import express, { Request, Response } from "express";
import { GetSummaryUseCase } from "./use-cases/get-summary"
import { CreateTransactionUseCase } from "./use-cases/create-transaction";
import { PrismaTransactionRepository } from "./repositories/prisma-transaction-repository";


const app = express();
app.use(express.json());

const repository = new PrismaTransactionRepository()

const createTransactionUseCase = new CreateTransactionUseCase(repository)

const getSummaryUseCase = new GetSummaryUseCase(repository)

app.post('/transactions', async (req: Request, res: Response) => {
    try {
        const transaction = await createTransactionUseCase.execute(req.body)
        return res.status(201).json(transaction)
    } catch (error: any) {
        return res.status(400).json({ message: error.message })
    }
});

app.get('/summary', async (req: Request, res: Response) => {
    try {
        const summary = await getSummaryUseCase.execute()
        return res.status(200).json(summary)
    } catch (error: any) {
        return res.status(500).json({ message: error.message })
    }
});

app.get('/transactions', async (req: Request, res: Response) => {
    try {
        const { type, category, startDate, endDate } = req.query;

        const filters = {
            type: type ? (type as any) : undefined,
            category: category ? (category as string) : undefined,
            startDate: startDate ? new Date(startDate as string) : undefined,
            endDate: endDate ? new Date(endDate as string) : undefined,
        };

        const transactions = await repository.findAll(filters);
        return res.status(200).json(transactions);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});