// Sequelize einbinden
import { Sequelize, DataTypes } from "sequelize";
import sequelize from '../lib/dbdata.js'

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });
 
let Shoppinglist = sequelize.define("shoppinglist", {
    user_id:{
                type:       DataTypes.INTEGER,        
            },
    item:   {
                allowNull:  false,
                type:       DataTypes.TEXT
            },
    amount:  {
                allowNull:  false,
                type:       DataTypes.INTEGER
            },
    category_id:  {
                allowNull:  false,
                type:       DataTypes.INTEGER
            }
}, {
    timestamps: false
});

sequelize.sync().then(() => {
    console.log('Shoppinglist table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

export default {
    sequelize,
    Shoppinglist
};