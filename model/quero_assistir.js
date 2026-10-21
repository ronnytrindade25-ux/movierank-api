import { EntitySchema } from "typeorm";

const queroAssistir = new EntitySchema({
    tableName: "QUERO_ASSISTIR",
    name: "queroAssistir",
    columns: {
        ID_USUARIO: {
            primary: true,
            type: "int",
            nullable: false
        },
        ID_IMDB: {
            primary: true,
            type: "varchar",
            length: 15,
            nullable: false
        },
        DATA_ADICIONADO: {
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false
        }
    },
});

export default queroAssistir;