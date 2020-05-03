const sql = require("./db.js");

// constructor
const Recipe = function(recipe) {
    this.ID_USERS = recipe.ID_USERS;
    this.NAME_RECIPE = recipe.NAME_RECIPE;
    this.COOKING_TIME = recipe.COOKING_TIME;
    this.PERSON_AMOUNT = recipe.PERSON_AMOUNT;
    this.VIDEO_LINK = recipe.VIDEO_LINK;
    this.IS_VALIDATED = recipe.IS_VALIDATED;
};

Recipe.create = (newRecipe, result) => {
  sql.query("INSERT INTO recipes SET ?", newRecipe, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created recipe: ", { id: res.insertId, ...newRecipe });
    result(null, { id: res.insertId, ...newRecipe });
  });
};

Recipe.findById = (recipeId, result) => {
  sql.query(`SELECT * FROM recipes WHERE ID_RECIPE = ${recipeId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found recipe: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Recipe with the id
    result({ kind: "not_found" }, null);
  });
};

Recipe.findByUser = (userId, result) => {
  sql.query(`SELECT * FROM recipes WHERE ID_USERS = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("recipes: ", res);
      result(null, res);
      return;
    }

    // not found Recipe with the id
    result({ kind: "not_found" }, null);
  });
};

Recipe.getAll = result => {
  sql.query("SELECT * FROM recipes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("recipes: ", res);
    result(null, res);
  });
};

Recipe.updateById = (id, recipe, result) => {
  sql.query(
    "UPDATE recipes SET ID_USERS = ?, NAME_RECIPE = ?, COOKING_TIME = ?, PERSON_AMOUNT = ?, VIDEO_LINK = ?, IS_VALIDATED = ? WHERE ID_RECIPE = ?",
    [recipe.ID_USERS, recipe.NAME_RECIPE, recipe.COOKING_TIME, recipe.PERSON_AMOUNT, recipe.VIDEO_LINK, recipe.IS_VALIDATED, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Recipe with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated recipe: ", { id: id, ...recipe });
      result(null, { id: id, ...recipe });
    }
  );
};

Recipe.remove = (id, result) => {
  sql.query("DELETE FROM recipes WHERE ID_RECIPE = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Recipe with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted recipe with id: ", id);
    result(null, res);
  });
};

Recipe.removeAll = result => {
  sql.query("DELETE FROM recipes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} recipes`);
    result(null, res);
  });
};

module.exports = Recipe;