export class EmailAlreadyExists extends Error {
  constructor(email) {
    super(`Email ${email} already exists`);
    this.name = "EmailAlreadyExists";
  }
}

export class UserNotFoundError extends Error {
  constructor(userId) {
    super(`User with id ${userId} not found`);
    this.name = "UserNotFoundError";
  }
}
