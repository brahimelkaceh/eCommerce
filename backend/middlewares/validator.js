const { body, validationResult } = require("express-validator");
const xss = require("xss");

class ValidatorSanitizer {
  constructor() {
    this.validationRules = [];
    this.sanitizeFields = [];
    this.validate = this.validate.bind(this);
    this.sanitize = this.sanitize.bind(this);
  }

  validate(req, res, next) {
    // Apply validation rules
    for (const input of Object.keys(req.body)) {
      if ("role" in req.body) {
        if (input === "role") {
          this.validationRules.push(
            body("role")
              .notEmpty()
              .withMessage("Role is required.")
              .isIn(["admin", "manager", "customer"])
              .withMessage("Invalid role"),
          );
          this.sanitizeFields.push("role");
        }
      }
      if ("email" in req.body) {
        if (input === "email") {
          this.validationRules.push(
            body("email").isEmail().withMessage("Valid email is required."),
          );
          this.sanitizeFields.push("email");
        }
      }
      if (`${input}` in req.body) {
        this.validationRules.push(
          body(input).notEmpty().withMessage(`${input} is required`),
        );
        this.sanitizeFields.push(input);
      }
    }
    Promise.all(this.validationRules.map((rule) => rule.run(req)))
      .then(() => {
        // Check for validation errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        // If there are no validation errors, proceed to sanitization
        this.sanitize(req);
        this.validationRules = [];
        this.sanitizeFields = [];
        next();
      })
      .catch(next); // Handle any errors that occur during validation
  }

  sanitize(req) {
    // Sanitize the specified fields using xss
    for (const field of this.sanitizeFields) {
      if (req.body[field]) {
        req.body[field] = xss(req.body[field]);
      }
    }
  }
}

module.exports = ValidatorSanitizer;
