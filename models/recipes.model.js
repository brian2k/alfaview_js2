// Sequelize einbinden
import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../lib/dbdata.js'

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 
let Recipes = sequelize.define("recipes", {
    id:     {
                type:       DataTypes.INTEGER,
                autoIncrement:  true,
                primaryKey:     true
            },
    name:   {
                allowNull:  false,
                type:       DataTypes.TEXT
            },
    ingredients:   {
                allowNull:  false,
                type:       DataTypes.TEXT
            },
    cooking:   {
                allowNull:  false,
                type:       DataTypes.TEXT
            },
    notes:   {
                allowNull:  false,
                type:       DataTypes.TEXT
            },
    category_id:   {
                allowNull:  false,
                type:       DataTypes.INTEGER
            },
    user_id:   {
                allowNull:  false,
                type:       DataTypes.INTEGER
            },
});

sequelize.sync().then(() => {
    console.log('Users table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

export default {
    sequelize,
    Recipes
};