const db = require("../models");
const User = db.users;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  if (!req.body.full_name || !req.body.username) {
    res
      .status(400)
      .send({ message: "Fullname and Username can not be empty!" });
  } else {
    const username = req.body.username;

    User.find({ "username": username })
      .then((data) => {
        if (Object.keys(data).length > 0) {
          res.status(404).send({ message: "Username already exist." });
          return;
        } else {
          // Create a Tutorial
          const user = new User({
            full_name: req.body.full_name,
            username: req.body.username,
            password: req.body.password,
          });

          user.save(user)
            .then((data) => {
              res.send(data);
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message || "Some error occurred while creating the User.",
              });
            });
        }
      })
      .catch((err) => {
        res.sendStatus(500).send({ message: err });
      });
  }
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const full_name = req.query.full_name;
  var condition = full_name ? { full_name: { $regex: new RegExp(full_name), $options: "i" } } : {};

  User.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete User with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Users were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all users.",
      });
    });
};

// Find all published Tutorials
// exports.findAllPublished = (req, res) => {};
