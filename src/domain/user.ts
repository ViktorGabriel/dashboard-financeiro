export interface User {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}

export interface CreateUserDTO {
    name: string;
    email: string;
    password: string;
}

export interface AuthUserDTO {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
}
