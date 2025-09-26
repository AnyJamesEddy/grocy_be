import databaseConnection from '../../config/config.js';
import DataTypes from 'sequelize';

const List = databaseConnection.postgresConnection.define('list', {
    id: DataTypes.UUID,
    name: DataTypes.STRING,
    date: DataTypes.DATE,
    articles: [
        {
            id: DataTypes.UUID,
            name: DataTypes.STRING,
            type: DataTypes.ENUM('CUCINA', 'CASA', 'ALTRO'),
        },
    ]
})
