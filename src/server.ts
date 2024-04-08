import fastify from "fastify";
import { createWard } from "./api/routes/ward.routes";

const app = fastify();
const port = 3333;

app.get("/", (request, reply) => {
  reply.send({ hello: "world" });
});

app.register(createWard);

app.listen({ port: port, host: "0.0.0.0" }).then(() => {
  console.log(`HTTP Server Running at ${port} `);
});
