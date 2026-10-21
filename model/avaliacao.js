import { EntitySchema } from "typeorm";

const avaliacao = new EntitySchema({
    tableName: "AVALIACAO",
    name: "avaliacao",
    columns: {
        id_avaliacao: {
            name: "ID_AVALIACAO",
            primary: true,
            generated: "increment",
            type: "int"
        },
        id_usuario: {
            name: "ID_USUARIO",
            type: "int",
            nullable: false
        },
        id_imdb: {
            name: "ID_IMDB",
            type: "varchar",
            length: 15,
            nullable: false
        },
        nota: {
            name: "NOTA",
            type: "decimal",
            precision: 3,
            scale: 1,
            nullable: false
        },
        comentario: {
            name: "COMENTARIO",
            type: "text",
            nullable: true
        },
        data_avaliacao: {
            name: "DATA_AVALIACAO",
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false
        },
        data_atualizacao: {
            name: "DATA_ATUALIZACAO",
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false,
            onUpdate: "CURRENT_TIMESTAMP"
        }
    },
    indices: [
        {
            name: "USUARIO_TITULO_UNIQUE",
            columns: ["id_usuario", "id_imdb"],
            unique: true
        },
        {
            name: "idx_avaliacao_imdb",
            columns: ["id_imdb"]
        }
    ],
    checks: [
        {
            name: "chk_nota",
            expression: "NOTA BETWEEN 0 AND 10"
        }
    ],
});

export default avaliacao;