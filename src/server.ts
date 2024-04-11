import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import {
  createWard,
  getWardById,
  getWards,
  updateWard,
} from "./api/routes/ward.routes";

const app = fastify();
const port = 3333;
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createWard);
app.register(getWards);
app.register(getWardById);
app.register(updateWard);

app.listen({ port: port, host: "0.0.0.0" }).then(() => {
  console.log(`HTTP Server Running at ${port} `);
});
