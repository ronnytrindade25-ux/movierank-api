import express from "express";
import { AppDataSource } from "./database/config.js";
import routes from "./routes.js";


// [DEPLOY] Este servidor roda no Render (o Netlify hospeda só a pasta frontend/).
// O Render executa "npm start", que roda "node index.js".

const server = express();
server.use(express.json());
server.use("/", routes);
// [DEPLOY] É esta rota "/api" que o Netlify vai chamar através do arquivo frontend/_redirects.
server.use("/api", routes);          // estudar essa parte depois
// [DEPLOY] O próprio Express também entrega o frontend. Se publicar só o backend,
// o site já funciona inteiro neste endereço, mesmo sem o Netlify.
server.use(express.static("frontend")); // estudar essa parte depois

AppDataSource.initialize().then(() => {
    console.log("Conectado ao banco de dados");
    // [DEPLOY] O Render informa a porta em process.env.PORT; no seu PC continua 3333.
    server.listen(process.env.PORT || 3333, () => {

        console.log("Server is running! 🚀 ")


    });
    }).catch((error) => {
    console.log("Houve um erro no servidor ====> " , error)

});
