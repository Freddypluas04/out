export class MainController {
    constructor({ model }) {
        this.model = model
    };

    renderIndex = async (req, res, next) => {
        res.render('index')
    }

    renderMatematicas = async (req, res, next) => {
        res.render('materias/mate')
    }
    renderprincipal = async (req, res, next) => {
        res.render('principal/home')
    }
    renderLenguaje = async (req, res, next) => {
        res.render('materias/lengua')
    }


    createTable = async (req, res, next) => {
        const data = await this.model.generateTable()
        res.send({ data
        } );
    }
}