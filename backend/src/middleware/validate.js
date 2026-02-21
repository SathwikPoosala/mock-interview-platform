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

module.exports = {
  validateRegister,
  validateLogin,
};
