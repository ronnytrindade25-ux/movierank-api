import express, { response } from "express";
import { AppDataSource } from "../database/config.js";
import rating from "../model/avaliacao.js"


const route = express.Router();
const table = AppDataSource.getRepository(rating)

route.get("/", async (request, response) => {
    try{
        const avaliacao = await table.find();
        return response.status(200).send({
            response: avaliacao
        });
    }catch (error) {
        return response.status(500).send({
            response: "erro ao buscar nota", error
        })
    }
});


route.post("/", async (request, response) => {
    const { id_usuario, id_imdb, nota, comentario } = request.body;
    console.log("body recebido:", request.body);
    try {
        const dataUser = table.create({ id_usuario, id_imdb, nota, comentario });
        await table.save(dataUser);
        
        return response.status(200).send({ response: "Nota cadastrada com sucesso." });
    } catch (error) {
        console.error(error);
        return response.status(500).send({ response: "erro ao cadastrar nota" });
    }
});


route.put("/", async (request, response) => {
    const { id_usuario, id_imdb, nota, comentario } = request.body;
    try {
        const resultado = await table.update(
            { id_usuario, id_imdb },
            { nota, comentario, data_atualizacao: new Date() }
        );

        if (resultado.affected === 0) {
            return response.status(404).send({ response: "Avaliação não encontrada." });
        }

        return response.status(200).send({ response: "Nota atualizada com sucesso." });
    } catch (error) {
        return response.status(500).send({ response: "erro ao atualizar nota" });
    }
});

export default route;