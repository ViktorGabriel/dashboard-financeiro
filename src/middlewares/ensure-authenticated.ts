import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'CHAVE_SECRETA_JWT';

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token não informado.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, JWT_SECRET) as { sub: string };
        (req as any).userId = payload.sub;
        return next();
    } catch {
        return res.status(401).json({ message: 'Token inválido ou expirado.' });
    }
}
