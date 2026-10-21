import express, { response } from "express";
import { AppDataSource } from "../database/config.js";
import user from "../model/usuario.js"
import { IsNull } from "typeorm";

const route = express.Router();
const table = AppDataSource.getRepository(user)

// [SEGURANÇA] Online, esta rota mostra login e e-mail de TODOS os usuários para qualquer visitante.
route.get("/", async (request, response) => {
    try {
        const users = await table.findBy({ deleted_at: IsNull() });
        console.log(users[0]);

        const lista = users.map((u) => ({
            id_usuario: u.id_usuario,
            login: u.login,
            email: u.email,
        }));

        return response.status(200).send({ response: lista });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ response: "Erro ao buscar usuários." });
    }
});

route.post("/", async (request, response) => {

    const {login, senha, email} = request.body;
    if(login.length < 2) {
        return response.status(400).send({response: "O nome deve conter no minimo 2 caracteres. "});
    }
    if(!email.includes("@")) {
        return response.status(400).send({response: "Email invalido"});
    }
    if(senha.length < 6) {
        return response.status(400).send({response: "A senha deve conter no minimo 6 caracteres"});
    }
    try {
        // [SEGURANÇA] A senha é salva em texto puro no banco (o ideal seria usar bcrypt).
        const dataUser = table.create({login, senha, email});

        await table.save(dataUser);

        return response.status(200).send({response: "usuário cadastrado com sucesso."});
    } catch (error){
        return response.status(500).send({response: error}) 
    }
});


route.post("/login", async (request, response) => {
    try {
        const { email, senha } = request.body;

        if (!email || !senha) {
            return response.status(400).send({ response: "Informe e-mail e senha." });
        }

        const usuario = await table.findOneBy({ email, senha, deleted_at: IsNull() });

        if (!usuario) {
            return response.status(401).send({ response: "E-mail ou senha incorretos." });
        }

        return response.status(200).send({
            response: { id_usuario: usuario.id_usuario, login: usuario.login, email: usuario.email },
        });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ response: "Erro no servidor." });
    }
});

export default route;