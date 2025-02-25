const express = require("express");
const router = express.Router();
const { getQuiz } = require("../controllers/quizController");

router.get("/:category", getQuiz);

module.exports = router;
