import fastify from "fastify";

const app = fastify();
const port = 3333;

app.get("/", function (request, reply) {
  reply.send({ hello: "world" });
});

app.listen({ port: port, host: "0.0.0.0" }, function (err, address) {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server running at: ${address}`);
});
