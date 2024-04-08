import { request } from "http";
import { prisma } from "../../lib/prisma";
import { WardType } from "../schemas/WardSchema";

export const wardService = {
  createWard: async function (wardData: WardType) {
    const { name, stake } = wardData;

    const notUniqueWard = await prisma.ward.findUnique({
      where: { name_stake: { name, stake } },
    });

    if (notUniqueWard) {
      throw new Error(`There is already a ward with this name in this Stake.`);
    }

    try {
      const newWard = await prisma.ward.create({ data: wardData });
      return newWard;
    } catch (error: any) {
      throw new Error(`Failed to create user: ${error.message}`);
    }
  },
};
