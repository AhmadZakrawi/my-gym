import {Sequelize} from "sequelize"
import dotenv from "dotenv"

dotenv.config()

const db = new Sequelize('mygym-db', process.env.DB_USER, process.env.DB_PW, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql"
})

export default db