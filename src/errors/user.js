export class EmailAlreadyExists extends Error {
  constructor(email) {
    super(`Email ${email} already exists`);
    this.name = "EmailAlreadyExists";
  }
}
