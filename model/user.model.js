export class UserModel {
    #cookie = 'Inside_Out';

    constructor({ executed }) {
        this.executed = executed;
    };

    async getUserByEmail(email) {
        const sql = `SELECT * FROM users WHERE email = $1;`
        const result = await this.executed(sql, [email]);
        return result.rows[0];
    }

    async createUser(username, password, name, email, birth, phone = []) {
        const sql = `SELECT * from insert_user($1, $2, $3, $4, $5, $6);`
        const result = await this.executed(sql, [username, password, name, phone, email, birth]);
        console.log(`${result.rows[0]}`.magenta);
        return result.rows[0];
    }

    async updateUser(id, email, password) {
        if (id <= 1) throw new Error ('No exixte el usuario')
        const sql = `UPDATE users SET email = $1, password = $2 WHERE id = $3 RETURNING *;`
        const result = await this.executed(sql, [email, password, id]);
        return result.rows[0];
    }

    async deleteUser(id) {
        if (id <= 1) throw new Error ('No exixte el usuario')
        const sql = `UPDATE users set state  = 0  WHERE id = $1 RETURNING *`
        const result = await this.executed(sql,[id])
        return result['rows']
    }

    isLogin(req, res, next) {
        const cookie = req.cookie(this.#cookie);
        if(!cookie) { }
        if (!req.session.info_user) { }
        next();
    }
}
