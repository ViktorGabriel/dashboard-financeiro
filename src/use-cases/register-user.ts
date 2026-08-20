import bcrypt from 'bcryptjs';
import { IUserRepository } from '../repositories/i-user-repository';
import { CreateUserDTO } from '../domain/user';

export class RegisterUserUseCase {
    constructor(private userRepository: IUserRepository) {}

    async execute(dto: CreateUserDTO) {
        const existing = await this.userRepository.findByEmail(dto.email);
        if (existing) {
            throw new Error('E-mail já cadastrado.');
        }

        const passwordHash = await bcrypt.hash(dto.password, 8);
        const user = await this.userRepository.create(dto, passwordHash);

        return user;
    }
}
