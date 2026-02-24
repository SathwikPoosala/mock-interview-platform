const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Question title is required"],
      trim: true,
      minlength: [5, "Title must be at least 5 characters"],
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Question description is required"],
      trim: true,
      minlength: [10, "Description must be at least 10 characters"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
      trim: true,
      lowercase: true,
    },
    topic: {
      type: String,
      required: [true, "Topic is required"],
      trim: true,
      lowercase: true,
    },
    difficulty: {
      type: String,
      required: [true, "Difficulty is required"],
      enum: ["easy", "medium", "hard"],
      lowercase: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    options: {
      type: [String],
      default: [],
      validate: {
        validator: function (value) {
          if (!Array.isArray(value)) {
            return false;
          }

          return value.every(
            (option) => typeof option === "string" && option.trim().length > 0
          );
        },
        message: "Options must be a non-empty string array",
      },
    },
    correctAnswer: {
      type: String,
      required: [true, "Correct answer is required"],
      trim: true,
    },
    explanation: {
      type: String,
      default: "",
      trim: true,
      maxlength: [2000, "Explanation cannot exceed 2000 characters"],
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

questionSchema.pre("validate", function () {
  this.tags = (this.tags || []).map((tag) => String(tag).trim().toLowerCase());
  this.options = (this.options || []).map((option) => String(option).trim());

  if (this.options.length > 0 && !this.options.includes(this.correctAnswer)) {
    this.invalidate(
      "correctAnswer",
      "Correct answer must match one of the provided options for MCQ"
    );
  }
});

questionSchema.index({ topic: 1, difficulty: 1 });
questionSchema.index({ tags: 1 });

module.exports = mongoose.model("Question", questionSchema);
