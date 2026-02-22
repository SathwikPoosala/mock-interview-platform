const isEmailValid = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(String(email).trim().toLowerCase());
};

const validateRegister = (req, res, next) => {
  const errors = [];
  const name = String(req.body.name || "").trim();
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  if (name.length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (!isEmailValid(email)) {
    errors.push("Please provide a valid email");
  }

  if (password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.name = name;
  req.body.email = email;

  return next();
};

const validateLogin = (req, res, next) => {
  const errors = [];
  const email = String(req.body.email || "").trim().toLowerCase();
  const password = String(req.body.password || "");

  if (!isEmailValid(email)) {
    errors.push("Please provide a valid email");
  }

  if (password.length === 0) {
    errors.push("Password is required");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.email = email;

  return next();
};

const validateProfileUpdate = (req, res, next) => {
  const errors = [];
  const name = String(req.body.name || "").trim();
  const bio = String(req.body.bio || "").trim();
  const profilePicture = req.body.profilePicture;

  if (name.length < 2) {
    errors.push("Name must be at least 2 characters");
  }

  if (bio.length > 500) {
    errors.push("Bio cannot exceed 500 characters");
  }

  if (
    profilePicture !== null &&
    profilePicture !== undefined &&
    typeof profilePicture !== "string"
  ) {
    errors.push("Profile picture must be a string URL or null");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.name = name;
  req.body.bio = bio;

  return next();
};

const validateChangePassword = (req, res, next) => {
  const errors = [];
  const currentPassword = String(req.body.currentPassword || "");
  const newPassword = String(req.body.newPassword || "");

  if (currentPassword.length === 0) {
    errors.push("Current password is required");
  }

  if (newPassword.length < 6) {
    errors.push("New password must be at least 6 characters");
  }

  if (currentPassword && newPassword && currentPassword === newPassword) {
    errors.push("New password must be different from current password");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  req.body.currentPassword = currentPassword;
  req.body.newPassword = newPassword;

  return next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateProfileUpdate,
  validateChangePassword,
};
