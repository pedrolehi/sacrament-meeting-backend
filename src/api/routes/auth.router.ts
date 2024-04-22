import { ZodTypeProvider } from "fastify-type-provider-zod";
import { FastifyInstance } from "fastify";
import { UserSchema } from "../schemas/User.schema";
import { z } from "zod";
import { userController } from "../controllers/user.controller";
import { authController } from "../controllers/auth.controller";

// POST /users;
export async function registerUser(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/auth/register",
    {
      schema: {
        summary: "Creates an user on db",
        tags: ["users"],
        body: UserSchema.omit({ id: true }),
        response: { 201: z.object({ id: z.string().uuid() }) },
      },
    },
    async (request, reply) => {
      await authController.register(request, reply);
    }
  );
}
