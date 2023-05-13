// Sequelize einbinden
import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../lib/dbdata.js'

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

let Categories = sequelize.define("categories", {   
    id:     {
                type:       DataTypes.INTEGER,
                autoIncrement:  true,
                primaryKey:     true     
            },
    user_id:{
                type:       DataTypes.INTEGER,
            },
    name:   {
                allowNull:  false,
                type:       DataTypes.TEXT
            }
});

sequelize.sync().then(() => {
    console.log('Categories table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

export default {
    sequelize,
    Categories
};