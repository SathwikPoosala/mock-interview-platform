const express = require("express");
const {
  getMyProfile,
  updateMyProfile,
  changeMyPassword,
} = require("../controllers/profileController");
const { protect } = require("../middleware/auth");
const {
  validateProfileUpdate,
  validateChangePassword,
} = require("../middleware/validate");

const router = express.Router();

router.get("/me", protect, getMyProfile);
router.put("/me", protect, validateProfileUpdate, updateMyProfile);
router.put("/me/password", protect, validateChangePassword, changeMyPassword);

module.exports = router;