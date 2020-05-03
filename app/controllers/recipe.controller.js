const Recipe = require("../models/recipe.model.js");

// Create and Save a new Recipe
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Recipe
  const recipe = new Recipe({
    ID_USERS: req.body.ID_USERS,
    NAME_RECIPE: req.body.NAME_RECIPE,
    COOKING_TIME: req.body.COOKING_TIME,
    PERSON_AMOUNT: req.body.PERSON_AMOUNT,
    VIDEO_LINK: req.body.VIDEO_LINK,
    IS_VALIDATED: req.body.IS_VALIDATED
  });

  // Save Recipe in the database
  Recipe.create(recipe, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Recipe."
      });
    else res.send(data);
  });
};

// Retrieve all Recipes from the database.
exports.findAll = (req, res) => {
    Recipe.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving recipes."
            });
        else res.send(data);
    });
};

// Find a single Recipe with a recipeId
exports.findOne = (req, res) => {
    Recipe.findById(req.params.recipeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Recipe with id ${req.params.recipeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Recipe with id " + req.params.recipeId
                });
            }
        } else res.send(data);
    });
};

// Find a single Recipe with a recipeId
exports.findAllFromUser = (req, res) => {
    Recipe.findByUser(req.params.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Recipe with user id ${req.params.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Recipe with user id " + req.params.userId
                });
            }
        } else res.send(data);
    });
};

// Update a Recipe identified by the recipeId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
    }
    
    Recipe.updateById(
        req.params.recipeId,
        new Recipe(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Recipe with id ${req.params.recipeId}.`
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Recipe with id " + req.params.recipeId
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Recipe with the specified recipeId in the request
exports.delete = (req, res) => {
    Recipe.remove(req.params.recipeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Recipe with id ${req.params.recipeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Recipe with id " + req.params.recipeId
                });
            }
        } else res.send({ message: `Recipe was deleted successfully!` });
    });
};

// Delete all Recipes from the database.
exports.deleteAll = (req, res) => {
    Recipe.removeAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all recipes."
            });
        else res.send({ message: `All Recipes were deleted successfully!` });
    });
};