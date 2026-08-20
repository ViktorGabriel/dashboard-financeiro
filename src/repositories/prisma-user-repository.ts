import { PrismaClient } from '../generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import { IUserRepository } from './i-user-repository';
import { User, CreateUserDTO } from '../domain/user';

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL || 'file:./dev.db' });
const prisma = new PrismaClient({ adapter });

export class PrismaUserRepository implements IUserRepository {
    async create(dto: CreateUserDTO, passwordHash: string): Promise<User> {
        const user = await prisma.user.create({
            data: {
                name: dto.name,
                email: dto.email,
                password: passwordHash,
            },
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };
    }

    async findByEmail(email: string): Promise<(User & { password: string }) | null> {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            createdAt: user.createdAt,
        };
    }

    async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return null;
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
        };
    }
}
