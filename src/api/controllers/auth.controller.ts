import { string } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserSchema, UserType } from "../schemas/User.schema";
import { userService } from "../services/userService";
import { hashPassword } from "../../lib/auth";

export const authController = {
  // POST /auth/register
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

      await userService.uniqueUser(userData.email);

      const newUser = userData;

      newUser.password = await hashPassword(newUser.password);

      console.log(newUser.password);

      const registerUser = await userService.register(newUser);

      return reply.status(201).send({ id: registerUser.id });
    } catch (error: any) {
      reply.code(500).send({ error: error.message });
    }
  },

  // POST /auth/login
  login: async (request: FastifyRequest, reply: FastifyReply) => {
    // const { email, password } = request.body;
    //   try {
    //     const user = await userService.uniqueUser(email);
    //     if (!user) {
    //       return reply.status(401).send({ message: "Not registered email." });
    //     }
    //   } catch (error) {}
  },
};
