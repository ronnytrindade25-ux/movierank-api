
import { EntitySchema } from "typeorm";

const user = new EntitySchema({
    tableName: "USUARIO",
    name: "usuario",
    columns: {
        id_usuario: {
            name: "ID_USUARIO",
            primary: true,
            generated: "increment",
            type: "int"
        },
        login: {
            type: "varchar",
            length: 50,
            nullable: false,
            unique: true
        },
        senha: {
            type: "varchar",
            length: 255,
            nullable: false
        },
        email: {
            type: "varchar",
            length: 150,
            nullable: false,
            unique: true
        },
        data_cadastro: {
            name: "DATA_CADASTRO",
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP",
            nullable: false
        },
        deleted_at: {
            type: "datetime", nullable: true
        },
    }
});

export default user;