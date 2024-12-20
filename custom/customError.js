class ApplicationError extends Error {
  constructor(message, statusCode) {
    super(message || "Something went wrong");
    Error.captureStackTrace(this, this.constructor);
    this.statusCode = statusCode || 500;
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends ApplicationError {
  constructor(message) {
    super(message || "Resource not found", 404);
  }
}
export class QuantityLimitExceededError extends ApplicationError {
  constructor(message) {
    super(message || "Quantity is more. Reduce the Quantity", 400);
  }
}

export class IncorrectPasswordError extends ApplicationError {
  constructor(message) {
    super(message || "Incorrect password", 401);
  }
}

export class EmailAlreadyExistsError extends ApplicationError {
  constructor(message) {
    super(message || "Email already exists", 409);
  }
}
export class PhoneNumberExistError extends ApplicationError {
  constructor(message) {
    super(message || "Phone Number already exists", 409);
  }
}

export class UnauthorizedError extends ApplicationError {
  constructor(message) {
    super(message || "Unauthorized access", 401);
  }
}
