import { Router } from "express";
import ContasController from "./controllers/ContasController";
import authentication from "./middleware/authentication";

const routes = Router();

routes.post("/contas", authentication.validate, ContasController.create); //http://localhost:3333/contas -> POST
routes.get("/contas", authentication.validate, ContasController.index); //http://localhost:3333/contas -> GET
routes.get("/contas/:id", authentication.validate, ContasController.show); //http://localhost:3333/contas/2 -> GET
routes.delete("/contas/:id", authentication.validate, ContasController.delete); //http://localhost:3333/contas/2 -> GET
routes.post("/login", ContasController.login);

export default routes;
