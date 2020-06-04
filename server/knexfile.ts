import path from 'path';

module.exports = {
    client: 'mysql',
    useNullAsDefault: true,
    connection: {
        host: '127.0.0.1',
        port: 3306,
        database: 'ecoleta',
        user: 'root',
        password: 'secret',
        charset: 'utf8mb4',
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    seeds: {
        directory: path.resolve(__dirname, 'src', 'database', 'seeds')
    },
};