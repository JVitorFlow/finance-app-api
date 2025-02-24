import { EmailAlreadyExists } from "../../errors/user.js";
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  emailIsAlreadyInUseResponse,
  invalidPassworResponse,
  badRequest,
  serverError,
  created,
  validateRequiredFields,
  requiredFieldIsMissingResponse,
} from "../helpers/index.js";

export class CreateuserController {
  constructor(createUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }
  async execute(httprequest) {
    try {
      const params = httprequest.body;

      // validar a requisição (campos obrigatórios, tamanho de senha e e-mail)
      const requiredFields = ["first_name", "last_name", "email", "password"];

      const { ok: someRequiredFieldIsMissing, missingField } =
        validateRequiredFields(params, requiredFields);

      if (!someRequiredFieldIsMissing) {
        return requiredFieldIsMissingResponse(missingField);
      }

      const passwordIsValid = checkIfPasswordIsValid(params.password);

      if (!passwordIsValid) {
        return invalidPassworResponse();
      }

      const emailIsValid = checkIfEmailIsValid(params.email);

      if (!emailIsValid) {
        return emailIsAlreadyInUseResponse(params.email);
      }

      // chamar o use case
      const createdUser = await this.createUserUseCase.execute(params);

      return created(createdUser);
    } catch (error) {
      console.error("Erro no Controller:", error.message);
      if (error instanceof EmailAlreadyExists) {
        return badRequest({ message: error.message });
      }
      return serverError();
    }
  }
}
