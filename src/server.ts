import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import {
  createWard,
  deleteWard,
  getWardById,
  getWards,
  updateWard,
} from "./api/routes/ward.router";
import { registerUser } from "./api/routes/user.router";

const app = fastify();
const port = 3333;
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createWard);
app.register(getWards);
app.register(getWardById);
app.register(updateWard);
app.register(deleteWard);

app.register(registerUser);

app.listen({ port: port, host: "0.0.0.0" }).then(() => {
  console.log(`HTTP Server Running at ${port} `);
});
