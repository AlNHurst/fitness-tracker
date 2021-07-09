const db = require("../models");
const router = require('express').Router();

// get all workouts in db
router.get("/api/workouts", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
        totalWeight: { $sum: "$exercises.weight" }
      }
    },
  ])
    .then((data) => {
      res.json(data)
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// get last 7 workouts in db
router.get("/api/workouts/range", (req, res) => {
  db.Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
        totalWeight: { $sum: "$exercises.weight" }
      }
    },
  ])
    .then((data) => {
      while (data.length > 7) {
        let workoutRange = data.shift()
      }
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

// add exercises to workout
router.put('/api/workouts/:id', (req, res) => {
  db.Workout.findOneAndUpdate(
    {
      _id: req.params.id
    },
    {
      $push: { exercises: req.body }
    })
    .then(response => {
      res.json(response)
    }).catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
