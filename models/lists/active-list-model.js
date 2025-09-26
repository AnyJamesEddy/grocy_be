import databaseConnection from '../../config/config.js';
import DataTypes from 'sequelize';

const ActiveList = databaseConnection.postgresConnection.define('active-list', {
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    articles: [
        {
            id: DataTypes.UUID,
            name: DataTypes.STRING,
            type: DataTypes.ENUM('CUCINA', 'CASA', 'ALTRO'),
            cancelled: DataTypes.BOOLEAN,
        },
    ]
})
