import knex from 'knex';

const connection = knex({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        database: 'ecoleta',
        user: 'root',
        password: 'secret',
        charset: 'utf8mb4',
    },
    useNullAsDefault: true
});

export default connection;