import { prisma } from "../../lib/prisma";
import { UserType } from "../schemas/User.schema";

export const userService = {
  register: async function (userData: Omit<UserType, "id">) {
    try {
      const newUser = await prisma.user.create({ data: userData });

      return newUser;
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  },

  uniqueUser: async function (email: string) {
    const notUniqueUser = await prisma.user.findUnique({
      where: { email },
    });

    if (notUniqueUser) {
      throw new Error(`There is already an User with this email on record.`);
    } else return null;
  },
};
