import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { UserSchema } from "../schemas/User.schema";
import { z } from "zod";
import { userController } from "../controllers/user.controller";

// POST /users;
export async function registerUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/users",
    {
      schema: {
        summary: "Creates an user on db",
        tags: ["users"],
        body: UserSchema.omit({ id: true }),
        response: { 201: z.object({ id: z.string().uuid() }) },
      },
    },
    async (request, reply) => {
      await userController.register(request, reply);
    }
  );
}
