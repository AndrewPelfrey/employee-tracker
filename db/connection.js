import pkg from 'pg'; 
const { Client } = pkg;

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_tracker',
    password: '2569',
    port: 5432,
});

client.connect()
.then(() => console.log('connected to the database'))
.catch((err) => console.error('Connection error', err.stack));

// db.connect();

export default client;