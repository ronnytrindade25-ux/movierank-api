import "reflect-metadata";
import { DataSource } from "typeorm";
import avaliacao from "../model/avaliacao.js";
import quero_assistir from "../model/quero_assistir.js";
import usuario from "../model/usuario.js";

const AppDataSource = new DataSource({

    // [DEPLOY] Os dados do banco vêm de variáveis de ambiente (cadastradas no painel do Render).
    // Se elas não existirem, usa os valores antigos, então no seu PC continua funcionando igual.
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASS || "",
    port: Number(process.env.DB_PORT) || 3306,
    database: process.env.DB_NAME || "movierank",
    // [DEPLOY] O MySQL da Aiven exige conexão segura (SSL). No Render, defina DB_SSL=true.
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : undefined,
    entities: [avaliacao, quero_assistir, usuario]
});       

export {AppDataSource};


