import { Router } from "express";
import { UserController } from "../controller/user.controller.js";


export const createUserRouter = ({model:model}) => {
    const userRouter = Router();
    const userController = new UserController({model: model})
    userRouter.get('/login',  userController.renderLogin);
    userRouter.get('/register',  userController.renderSignup);
    userRouter.post('/register',  userController.createUser);
    
    return userRouter;
}