import { prisma } from "../../lib/prisma";
import { UserType } from "../schemas/UserSchema";

export const userService = {
  createUser: async function (userData: UserType) {
    const user = await prisma.user.create({ data: userData });
  },
};
