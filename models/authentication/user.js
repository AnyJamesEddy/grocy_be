import  databaseConnection  from '../../config/config.js';
import DataTypes  from 'sequelize';

const User = databaseConnection.postgresConnection.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isSuperAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    isPremium: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "admin"
    },
    accessToken:{
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue:""
    },
});

export default User;
