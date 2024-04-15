import { FastifyReply, FastifyRequest } from "fastify";
import { UserSchema, UserType } from "../schemas/User.schema";
import { userService } from "../services/UserService";

export const userController = {
  // POST /users
  register: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const userData = request.body as Omit<UserType, "id">;

      // Validates if userData is !== than type WardType and if it is, thows an error.
      const validatedData = UserSchema.omit({
        id: true,
      }).safeParse(userData);

      if (!validatedData.success) {
        throw new Error(
          `userData does not match UserType: ${validatedData.error.message}`
        );
      }

      const newUser = await userService.register(userData);

      return reply.status(201).send({ id: newUser.id });
    } catch (error: any) {
      reply.code(500).send({ error: error.message });
    }
  },
};
