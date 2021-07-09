const db = require("../models");
const router = require('express').Router();

// get all workouts in db
router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((data) => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// create a workout in db
router.post("/api/workouts", (req, res) => {
  db.Workout.create(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.put('/api/workouts/:id', (req, res) => {
  db.Workout.updateOne(
    {
      _id: req.params.id
    },
    {
      $push: { exercises: req.body }
    },
    {
      new: true
    })
    .then(response => {
      res.json(response)
    }).catch(err => {
      res.json(err);
    });
});

module.exports = router;
