const router = require("express").Router();
const Monster = require(`../models/Monster.model.js`)
const FRONTEND_URL = process.env.ORIGIN || "http://localhost:5173";

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

// get all monsters
router.get("/monsters", async (req, res, next) => {
  try {
    const monsters = await Monster.find();
    return res.status(200).json({ monsters });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// get all environments for filter purpose
router.get("/filter/environments", async (req, res, next) => {
  try {
    const result = await Monster.aggregate([
      { $unwind: "$environments" },
      { $group: { _id: "$environments", count: { $sum: 1 } } },
      { $project: { _id: 0, name: "$_id", count: 1 } }
    ]);
    return res.status(200).json({ environments: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});

// get all monster types for filter purpose
router.get("/filter/types", async (req, res, next) => {
  try {
    const result = await Monster.aggregate([
      { $unwind: "$type" },
      { $group: { _id: "$type", count: { $sum: 1 } } },
      { $project: { _id: 0, type: "$_id", count: 1 } }
    ]);
    return res.status(200).json({ types: result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});


// get one individual monster
router.get("/monster/:monsterId", async (req, res, next) => {
  const { monsterId } = req.params;
  const requestOrigin = req.get("origin");
  try {
    const monster = await Monster.findById(monsterId);
    if (!monster) {
      return res.status(404).json({ message: `Monster not found` });
    }
    return res.status(200).json({ monster });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
