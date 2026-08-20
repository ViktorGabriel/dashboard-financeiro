import { User, CreateUserDTO } from '../domain/user';

export interface IUserRepository {
    create(dto: CreateUserDTO, passwordHash: string): Promise<User>;
    findByEmail(email: string): Promise<(User & { password: string }) | null>;
    findById(id: string): Promise<User | null>;
}
