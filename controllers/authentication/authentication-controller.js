import jwt from "jsonwebtoken";
import User from "../../models/authentication/user.js";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET;

export async function login(req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Credenziali non valide' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenziali non valide' });
        }

        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
                isPremium: user.isPremium
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        user.accessToken = token;
        await user.save();

        return res.status(200).json({
            message: 'Login effettuato con successo',
            token,
            user: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
                isPremium: user.isPremium
            },
        });
    } catch (error) {
        console.error('Errore login:', error);
        return res.status(500).json({ message: 'Errore server', error });
    }
}

export async function logout(req, res, next) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Token mancante' });

        const user = await User.findOne({ where: { accessToken: token } });
        if (!user) return res.status(403).json({ message: 'Token non valido' });

        user.accessToken = "";
        await user.save();

        return res.status(200).json({ message: 'Logout effettuato con successo' });
    } catch (error) {
        console.error('Errore durante il logout:', error);
        return res.status(500).json({ message: 'Errore server', error });
    }
}

async function getInfo(req, res, next) {
    try {
        const userId = req.user.id;

        const user = await User.findByPk(userId,
            {});

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        res.status(200).json({user: user});
    } catch (error) {
        next(error);
    }
}

export default {
    login,
    logout,
    getInfo
}
