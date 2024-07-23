import { Router } from "express"
import { MainController } from "../controller/main.controller.js";

export const createMainRouter = ({model:model}) => {
    const mainRouter = Router();
    const mainController = new MainController({model: model})

    mainRouter.get('/',  mainController.renderIndex);
    mainRouter.get('/materias/mate',  mainController.renderMatematicas);
    mainRouter.get('/materias/lengua',  mainController.renderLenguaje);
    mainRouter.get('/principal',  mainController.renderprincipal);
    mainRouter.get('/createTable',  mainController.createTable);
    return mainRouter;
}