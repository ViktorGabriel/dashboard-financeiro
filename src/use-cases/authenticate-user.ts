import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IUserRepository } from '../repositories/i-user-repository';
import { AuthUserDTO, AuthResponse } from '../domain/user';

const JWT_SECRET = process.env.JWT_SECRET || 'CHAVE_SECRETA_JWT';

export class AuthenticateUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(dto: AuthUserDTO): Promise<AuthResponse> {
        const user = await this.userRepository.findByEmail(dto.email);
        if (!user) {
            throw new Error('Credenciais inválidas.');
        }

        const passwordMatch = await bcrypt.compare(dto.password, user.password);
        if (!passwordMatch) {
            throw new Error('Credenciais inválidas.');
        }

        const token = jwt.sign({ sub: user.id }, JWT_SECRET, { expiresIn: '7d' });

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
            token,
        };
    }
}
