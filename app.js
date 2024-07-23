import express from "express";
import cors from "cors";
import morgan from "morgan";
import executed from "./database/execute.db.js";
import Handlebars from "handlebars";
import pkg from 'colors';
import path from "path";
import { PORT_SERVER } from "./env.js";
import { create } from 'express-handlebars';
import { TableModel } from "./model/table.model.js";
import { PlayModel } from "./model/play.model.js"; 
import { fileURLToPath } from "url";
import { createMainRouter } from "./router/main.routes.js";
import { createUserRouter } from "./router/user.routes.js";
import { UserModel } from "./model/user.model.js";


const app = express();
const { Color } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Handlebars engine
const hbs = create({
    handlebars: Handlebars,
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
});


app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set('trust proxy', true);

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors("*"));
app.use(morgan("dev"));

const table = new TableModel({ executed });
const user = new UserModel({ executed });
//const x = await table.getTableByGame()


app.use(createMainRouter({model : table}));
app.use(createUserRouter({model : user}));
app.listen(PORT_SERVER, () => {
    console.log(`Server running in ${pkg.cyan.bold(`http://localhost:${PORT_SERVER}`)}`.bold);
});


