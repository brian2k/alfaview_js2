import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'gastroapp',          // 'DATABASE'
    '',              // 'USERNAME'
    '',   // 'PASSWORD'
     {
       host: 'localhost', // 'SERVERNAME'
      dialect: 'mysql'    // 'DIALECT'
     }
)

export default sequelize