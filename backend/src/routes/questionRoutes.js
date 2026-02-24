const express = require("express");
const { addQuestion } = require("../controllers/questionController");
const { protect, adminOnly } = require("../middleware/auth");
const { validateQuestionCreate } = require("../middleware/validate");

const router = express.Router();

router.post("/", protect, adminOnly, validateQuestionCreate, addQuestion);

module.exports = router;
