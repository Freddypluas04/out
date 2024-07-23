
export class PlayModel {
    constructor({ executed }) {
        this.executed = executed;
    }
    

    // async createPlayer(name, company_id = 1) {
    //     if (typeof name !== 'string') throw new Error("El nombre debe ser un texto");
    //     if (typeof company_id !== 'number' || company_id <= 0) throw new Error("Debe ingresar una compañía válida");
    //     const sql = `INSERT INTO tb_play (name, company_id) VALUES ($1, $2) RETURNING id AS message;`;
    //     const result = await this.executed(sql, [name, company_id]);
    //     return result.rows[0].message;
    // }

    

}
