const router = require("express").Router();
const db = require("../models/Workout");

router.post("/api/workouts", (req, res) => {
  db.create({})
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.put("/api/workouts/:id", (req, res) => {
  db.findByIdAndUpdate(
    req.params.id,
    { $push: { exercises: req.body } },
    { new: true, runValidators: true }
  )
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get("/api/workouts", (req, res) => {
  db.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

router.get("/api/workouts/range", (req, res) => {
  db.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration",
        },
      },
    },
  ])
    .sort({ _id: -1 })
    .limit(7)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

module.exports = router;
