import { prisma } from "../../lib/prisma";
import { QueryType } from "../schemas/QuerySchema";
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

  getWards: async function ({ pageIndex }: QueryType) {
    const index: number = Number(pageIndex ?? "0");

    const allWards = await prisma.ward.findMany({
      select: {
        id: true,
        name: true,
        stake: true,
        users: { select: { id: true, name: true, role: true } },
      },
      take: 10,
      skip: index * 10,
      orderBy: { name: "asc" },
    });

    return {
      allWards: allWards.map((ward) => {
        return {
          id: ward.id,
          name: ward.name,
          stake: ward.stake,
          users: ward.users?.map((user) => {
            user.id, user.name, user.role;
          }),
        };
      }),
    };
  },
};
