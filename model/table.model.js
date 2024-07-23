import { PlayModel } from "./play.model.js";

export class TableModel extends PlayModel {
    #header = `
        select
            tph.id,
            tph.hash,
            tph.is_free,
            tph.amount,
            tc."name"
        from
            tb_play_header tph  
        join 
            tb_contract tc on tc.id = tph.contract_id 
        where 
            tph.play_id  = $1
        LIMIT 12;`

    #body = ` 
    select id,  b,i,n,g,o ,  table_name from
        (
            select 	b,i,n,g,o, header_id , id, 
                    'tb_row_1' as table_name 
            from tb_row_1 
            union all 
            select 	b,i,n,g,o, header_id , id,
                    'tb_row_2' as table_name 
            from tb_row_2  
            union all 
            select 	b,i,n,g,o, header_id , id,
                    'tb_row_3' as table_name
            from tb_row_3  
            union all 
            select 	b,i,n,g,o, header_id , id,
                    'tb_row_4' as table_name
            from tb_row_4  
            union all 
            select 	b,i,n,g,o, header_id , id,
                    'tb_row_4' as table_name
            from tb_row_5
        ) as tb
        where 
            tb.header_id = $1;`

    
    constructor({ executed }) {
        super({ executed });
        this.executed = executed
    };


    async getTableByGame(){
        const response = []

        const result = await this.executed(this.#header, [1])
        for( const r of result['rows']){
            const result = await this.executed(this.#body,[r.id]);
            r.data = result['rows'];
            response.push(r)
        }
        
        return response
    }


    generateTable() {
        const boardArray = [[], [], [], [], []];

        // Generar números aleatorios únicos para cada columna
        boardArray[0] = this.getRandomNumbers(1, 15);
        boardArray[1] = this.getRandomNumbers(16, 30);
        boardArray[2] = this.getRandomNumbers(31, 45);
        boardArray[3] = this.getRandomNumbers(46, 60);
        boardArray[4] = this.getRandomNumbers(61, 75);
        return this.getOrderArray(boardArray)

    }

    getOrderArray = (boardArray) => {
        const hash = [];
        const rows = [[], [], [], [], []];
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                if (i === 2 && j === 2) boardArray[j][i] = 0;
                hash.push(boardArray[j][i]);
                rows[i].push(boardArray[j][i]);
            }
        }
        return [rows, String(this.sortNumbers(hash))]
    }

    getRandomNumbers = (min, max) => {
        const numbers = new Set();
        while (numbers.size < 5) {
            numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return Array.from(numbers);
    };
    
    sortNumbers(numbers) {
        if (!Array.isArray(numbers)) {
            throw new Error('El argumento debe ser un arreglo de números');
        }
        return numbers.slice().sort((a, b) => a - b).join(",");
    }
}