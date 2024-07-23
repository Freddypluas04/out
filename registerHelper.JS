export const handlebars= (Handlebars)=>{
    Handlebars.registerHelper("condition", function(x, y, symbol) {
        switch(symbol) {
            case '==':
                return x == y;
            case '===':
                return x === y;
            case '!=':
                return x != y;
            case '!==':
                return x !== y;
            case '<':
                return x < y;
            case '<=':
                return x <= y;
            case '>':
                return x > y;
            case '>=':
                return x >= y;
            default:
                return false;
        }
    });
    return Handlebars
}
