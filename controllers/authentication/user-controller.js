import User from "../../models/authentication/user.js";
import bcrypt from "bcryptjs";

export async function createUser(req, res, next) {
    try {
        const { name, surname, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            surname,
            email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: 'Utente creato con successo',
            user: {
                id: newUser.id,
                name: newUser.name,
                surname: newUser.surname,
                email: newUser.email,
                role: newUser.role,
                isActive: newUser.isActive,
                isPremium: newUser.isPremium
            }
        });
    } catch (error) {
        console.error('Errore creazione utente:', error);

        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Email già registrata' });
        }

        return res.status(500).json({ message: 'Errore server', error });
    }
}

export default {
    createUser,
}
