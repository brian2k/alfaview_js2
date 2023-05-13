import express from "express";
import users from "../models/user.model.js";
import shoppinglistdb from "../models/shoppinglist.model.js";
import categoriesdb from "../models/categories.model.js";
import recipesdb from "../models/recipes.model.js";


const APP = express();
const IP = "192.168.2.101";
const PORT = 8081;

APP.set("view engine", "ejs");

APP.use(express.static("public"));
APP.use(express.static("views"));

APP.use(express.urlencoded({extended: true}));
APP.use(express.json());

// ====================================
// ============== LOGIN ROUTE =========
// ====================================

APP.get("/", function (req, res) {
    res.render("login");
});

APP.post("/login", function  (req, res) {
    let recipes
    let categories;
    let user;
    let shoppinglist;
    
    users.Users.findOne({
        raw: true,
        attributes: ["id","name","password"],
        where: {
            name: req.body.username,
            password: req.body.password
        }
    })
    .then(userdata => {
        console.log("User Before: " + JSON.stringify(userdata));    
        user = userdata
        console.log("User After: " + JSON.stringify(user));    

        res.render("index", {user: user});

        // ==============================================
        // =============== Seiten-Routing ===============
        // ==============================================

        // =========== CATEGORIES & SHOPPINGLIST ===========
        
        APP.get("/shoppinglist", async (req, res) =>{
            console.log("Userdata: " + JSON.stringify(userdata));    
            console.log("User: " + JSON.stringify(user));    
            return categoriesdb.Categories.findAll({
                raw: true, 
                attributes: ["id","user_id","name"],
                where: {
                    user_id: user.id
                }                
            }).then(categoriesdb => {
                categories = categoriesdb
                console.log("User: " + JSON.stringify(user));
                
                return shoppinglistdb.Shoppinglist.findAll({
                    raw: true, 
                    attributes: ["id","user_id","item","amount","category_id"],
                    where: {
                        user_id: user.id,
                        category_id: categoriesdb[0].id
                    }
                })
                .then(shoppinglistdata => {
                        shoppinglist = shoppinglistdata;
                        console.log("User: " + JSON.stringify(user));

                        res.render("shoppinglist", { groceries: shoppinglistdata, categories: categories, user: userdata.name });
                })
            })
        })

        // ============== CHECK(BOX) ITEM ==============

        APP.post("/checkgrocerie", (req,res) => {
            shoppinglistdb.Shoppinglist.destroy({
                where: {id: req.body.groceryarray}
            }).then(test => {
                return shoppinglistdb.Shoppinglist.findAll({
                    raw: true, 
                    attributes: ["id","user_id","item","amount","category_id"],
                    where: {
                        user_id: user.id,
                        category_id: req.body.categories
                    }
                }).then(newList => res.render("parts/shoppinglist", { groceries: newList }))
            })




            
        });

        // ============== ADD ITEM ==================

        APP.post("/addgrocerie", (req, res) => {
            shoppinglistdb.Shoppinglist.findAll({
                raw: true, 
                attributes: ["id","user_id","item","amount","category_id"],
                where: {
                    user_id: user.id,
                    category_id: req.body.categories
                }
            }).then(shoppinglist => {    
                let oldItems = (shoppinglist.filter(x => x.category_id == req.body.categories));
                let newItem = {user_id: user.id,item: req.body.newitem, amount: req.body.newitemamount, category_id: req.body.categories};
                oldItems.push(newItem)

                shoppinglistdb.Shoppinglist.create({
                    user_id:            user.id,
                    item:               req.body.newitem,
                    amount:             req.body.newitemamount,
                    category_id:        req.body.categories
                })
                res.render("parts/shoppinglist", { groceries: oldItems });
            })
        });

        // ============== CHANGE CATEGORY ===============

        APP.post("/showshoppinglist", (req,res) => {
            shoppinglistdb.Shoppinglist.findAll({
                raw: true, 
                attributes: ["id","user_id","item","amount","category_id"],
                where: {
                    user_id: user.id,
                    category_id: req.body.categories
                }
            }).then(shoppinglist => {
                let myGrocery = shoppinglist.filter(x => x.category_id == req.body.categories);
                if(myGrocery)
                    res.render("parts/shoppinglist", { groceries: myGrocery, categories: req.body.categories});
                else
                    res.render("parts/shoppinglist", { groceries: "" });
            })



        });

        // =========== CATEGORIES =========== 

        APP.get("/categories", function (req, res) {
            res.render("categories", {myvar: "categories not done yet :("});
        });

        // =========== RECIPES =========== 

        APP.get("/recipes", function (req, res) {

            recipesdb.Recipes.findAll({
                raw: true, 
                attributes: ["id","name","ingredients", "cooking", "notes", "category_id", "user_id"],
                where: {
                    user_id: user.id
                }
            }).then(recipes =>{
                console.log("cats: " + JSON.stringify(categories));
                res.render("recipes", { recipes: recipes, categories: categories });

            })

        });


        APP.post("/showrecipe", (req, res) => {
            res.render("recipes", { recipes: JSON.parse(recipes), categories: JSON.parse(categories) });
        });
        

        // ====================================
        // =========== MENU MANAGER ===========
        // ====================================

        APP.get("/menu_manager", function (req, res) {
            res.render("menu_manager");
        });


        APP.get("/menu", (req,res) => {
            res.render("menu")
        });
        

            })
            .catch(err => console.log("Fehler: ", err))
        })

// ====================================
// ========= Server starten =========== 
// ====================================

APP.listen(PORT,IP, () => {console.log(`http://${IP}:${PORT}`); return});