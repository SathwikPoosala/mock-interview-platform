const Question = require("../models/Question");

const addQuestion = async (req, res) => {
  try {
    const {
      title,
      description,
      subject,
      topic,
      difficulty,
      tags,
      options,
      correctAnswer,
      explanation,
    } = req.body;

    const question = await Question.create({
      title,
      description,
      subject,
      topic,
      difficulty,
      tags,
      options,
      correctAnswer,
      explanation,
      createdBy: req.user._id,
    });

    return res.status(201).json({
      message: "Question added successfully",
      question,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add question",
      error: error.message,
    });
  }
};

module.exports = {
  addQuestion,
};
