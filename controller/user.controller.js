export class UserController {
    constructor({ model }) {
        this.model = model
    };

    renderLogin = async (req, res, next) => {
        const style  = [ 'login.css']
        res.render('auth/login',
            { layout: 'auth' , style}
        )
    };

    renderSignup = async (req, res, next) => {
        const style  = [ 'login.css']
        res.render('auth/signup',
            { layout: 'auth', style }
        )
    }

    createUser = async (req, res, next) => {
        const { username, password, name, email, birth, phone } = req.body;
        const response = await this.model.createUser(username, password, name, email, birth, phone);
        res.status(200).send(response);
    }

}