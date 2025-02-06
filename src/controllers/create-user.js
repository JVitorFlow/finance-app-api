import { CreateUserUseCase } from "../use-cases/create-user.js";
import { EmailAlreadyExists } from "../errors/user.js";
import {
  checkIfEmailIsValid,
  checkIfPasswordIsValid,
  emailIsAlreadyInUseResponse,
  invalidPassworResponse,
  badRequest,
  serverError,
  created,
} from "./helpers/index.js";

export class CreateuserController {
  async execute(httprequest) {
    try {
      const params = httprequest.body;

      // validar a requisição (campos obrigatórios, tamanho de senha e e-mail)
      const requiredFields = ["first_name", "last_name", "email", "password"];

      for (const field of requiredFields) {
        if (!params[field] || params[field].trim().length === 0) {
          return badRequest({ message: `Missing param: ${field}` });
        }
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
      const createUserUseCase = new CreateUserUseCase();

      const createdUser = await createUserUseCase.execute(params);

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
