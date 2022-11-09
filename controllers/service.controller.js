const db = require("../models");
const Service = db.services;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
    if (!req.body.name || !req.body.teller || !req.body.window || !req.body.office) {
        res.status(400).send({ message: "Fullname and Username can not be empty!" });
    } else {
        const service = new Service({
            name: req.body.full_name,
            teller: req.body.username,
            password: pass,
            password: pass,
        });

        user.save(user)
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send(err.message);
            });
    }
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};