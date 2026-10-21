import express from "express";
import userController from "./controllers/userController.js";
import avaliacaoController from "./controllers/avaliacaoController.js";
// import quero_assistirController from "./controllers/quero_AssistirController.js";

const routes = express();

routes.use("/user", userController);
routes.use("/avaliacao", avaliacaoController);
// routes.use("/quero_assistir", quero_assistirController);

export default routes;