import "dotenv/config.js";
import express from "express";
import { CreateuserController } from "./src/controllers/create-user.js";
import { GetuserByIdController } from "./src/controllers/get-user-by-id.js";

const app = express();

app.use(express.json());

app.post("/api/users", async (request, response) => {
  const createuserController = new CreateuserController();
  const { statusCode, body } = await createuserController.execute(request);
  response.status(statusCode).json(body);
});

app.get("/api/users/:userId", async (request, response) => {
  const getUserByIdController = new GetuserByIdController();
  const { statusCode, body } = await getUserByIdController.execute(request);
  response.status(statusCode).json(body);
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`),
);
