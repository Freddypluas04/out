import pkg from 'pg';
import { DATABASE, PASSWORD, PORT_DB, USER } from '../env.js';
const { Pool } = pkg;

const pool = new Pool({
    user: USER,
    port: PORT_DB,
    password: PASSWORD,
    database: DATABASE
})

pool.on('connect', () => {
    console.log('Conexión a la base de datos establecida'.magenta);
});

function executed(sql, params = []) {
    return new Promise((resolve, reject) => {
        pool.query(sql, Array.isArray(params) ? params : [params], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}

export default executed;

