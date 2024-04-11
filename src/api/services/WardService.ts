import { WardType, WardIdType, WardUpdateType } from "./../schemas/WardSchema";
import { prisma } from "../../lib/prisma";
import { QueryType } from "../schemas/QuerySchema";

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

  getWardById: async function ({ wardId }: WardIdType) {
    if (typeof wardId !== "string" || null) {
      throw new Error(`ID type is not a string or null.`);
    }

    const ward = await prisma.ward.findUnique({
      where: { id: wardId },
      select: {
        id: true,
        name: true,
        stake: true,
        users: { select: { id: true, name: true, role: true } },
      },
    });

    return ward;
  },

  updateWard: async function ({ wardId }: WardIdType, data: WardUpdateType) {
    if (typeof wardId !== "string" && wardId !== null) {
      throw new Error(`ID type is not a string or null.`);
    }

    const existingWard = await prisma.ward.findUnique({
      where: { id: wardId },
    });

    if (!existingWard) {
      throw new Error(`Ward not found`);
    }

    const newWard = await prisma.ward.update({
      where: { id: wardId },
      data: {
        name: data.name || undefined,
        stake: data.stake || undefined,
      },
      select: { id: true, name: true, stake: true },
    });

    return newWard;
  },
};
