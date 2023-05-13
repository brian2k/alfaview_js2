import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    'gastroapp',          // 'DATABASE'
    'brian',              // 'USERNAME'
    'h/sE4!66CWPMBZcs',   // 'PASSWORD'
     {
       host: 'localhost', // 'SERVERNAME'
      dialect: 'mysql'    // 'DIALECT'
     }
)

export default sequelize