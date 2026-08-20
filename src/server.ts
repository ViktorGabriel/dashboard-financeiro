import express, { Request, Response } from "express";
import { GetSummaryUseCase } from "./use-cases/get-summary";
import { CreateTransactionUseCase } from "./use-cases/create-transaction";
import { GetCashFlowUseCase } from "./use-cases/get-cash-flow";
import { GetCategoryBreakdownUseCase } from "./use-cases/get-category-breakdown";
import { RegisterUserUseCase } from "./use-cases/register-user";
import { AuthenticateUserUseCase } from "./use-cases/authenticate-user";
import { PrismaTransactionRepository } from "./repositories/prisma-transaction-repository";
import { PrismaUserRepository } from "./repositories/prisma-user-repository";
import { ensureAuthenticated } from "./middlewares/ensure-authenticated";

const app = express();
app.use(express.json());

const transactionRepository = new PrismaTransactionRepository();
const userRepository = new PrismaUserRepository();

const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository);
const getSummaryUseCase = new GetSummaryUseCase(transactionRepository);
const getCashFlowUseCase = new GetCashFlowUseCase(transactionRepository);
const getCategoryBreakdownUseCase = new GetCategoryBreakdownUseCase(transactionRepository);
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);

// ─── Rotas públicas de Autenticação ────────────────────────────────────────────

app.post('/auth/register', async (req: Request, res: Response) => {
    try {
        const user = await registerUserUseCase.execute(req.body);
        return res.status(201).json(user);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
});

app.post('/auth/login', async (req: Request, res: Response) => {
    try {
        const result = await authenticateUserUseCase.execute(req.body);
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(401).json({ message: error.message });
    }
});

// ─── Rotas Protegidas (requerem autenticação JWT) ──────────────────────────────

app.post('/transactions', ensureAuthenticated, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string;
        const transaction = await createTransactionUseCase.execute({ ...req.body, userId });
        return res.status(201).json(transaction);
    } catch (error: any) {
        return res.status(400).json({ message: error.message });
    }
});

app.get('/summary', ensureAuthenticated, async (req: Request, res: Response) => {
    try {
        const summary = await getSummaryUseCase.execute();
        return res.status(200).json(summary);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});

app.get('/transactions', ensureAuthenticated, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string;
        const { type, category, startDate, endDate } = req.query;

        const filters = {
            userId,
            type: type ? (type as any) : undefined,
            category: category ? (category as string) : undefined,
            startDate: startDate ? new Date(startDate as string) : undefined,
            endDate: endDate ? new Date(endDate as string) : undefined,
        };

        const transactions = await transactionRepository.findAll(filters);
        return res.status(200).json(transactions);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});

app.get('/dashboard/cash-flow', ensureAuthenticated, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string;
        const result = await getCashFlowUseCase.execute({ ...(req.query as any), userId });
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});

app.get('/dashboard/categories', ensureAuthenticated, async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId as string;
        const result = await getCategoryBreakdownUseCase.execute({ ...(req.query as any), userId });
        return res.status(200).json(result);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});