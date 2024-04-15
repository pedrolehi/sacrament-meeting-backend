import { WardType } from "../schemas/Ward.schema";
import { prisma } from "../../lib/prisma";
import { QueryType } from "../schemas/Query.schema";

export const wardService = {
  createWard: async function ({
    name,
    stake,
  }: Pick<WardType, "name" | "stake">) {
    const notUniqueWard = await prisma.ward.findUnique({
      where: { name_stake: { name, stake } },
    });

    if (notUniqueWard) {
      throw new Error(`There is already a ward with this name in this Stake.`);
    }

    try {
      const newWard = await prisma.ward.create({ data: { name, stake } });

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
        _count: { select: { users: true } },
      },
      take: 10,
      skip: index * 10,
      orderBy: { name: "asc" },
    });

    return allWards.map((ward) => {
      return {
        id: ward.id,
        name: ward.name,
        stake: ward.stake,
        users: ward._count.users,
      };
    });
  },

  getWardById: async function ({ id }: Pick<WardType, "id">) {
    if (typeof id !== "string" || null) {
      throw new Error(`ID type is not a string or null.`);
    }

    try {
      const ward = await prisma.ward.findUnique({
        where: { id: id },
        select: {
          id: true,
          name: true,
          stake: true,
          users: { select: { id: true, name: true, role: true } },
        },
      });

      return ward;
    } catch (error: any) {
      throw new Error(`Failed to find ward: ${error.message}`);
    }
  },

  updateWard: async function ({ id, name, stake }: Partial<WardType>) {
    if (typeof id !== "string" && id !== null) {
      throw new Error(`ID type is not a string or null.`);
    }

    try {
      const existingWard = await prisma.ward.findUnique({
        where: { id: id },
        select: { name: true, stake: true },
      });

      if (!existingWard) {
        throw new Error(`Ward not found`);
      }

      const newWard = await prisma.ward.update({
        where: { id: id },
        data: {
          name: name || undefined,
          stake: stake || undefined,
        },
        select: { name: true, stake: true },
      });

      return { beforeUpdate: existingWard, updated: newWard };
    } catch (error: any) {
      throw new Error(`Failed to update ward: ${error.message}`);
    }
  },

  deleteWard: async function ({ id }: Pick<WardType, "id">) {
    if (typeof id !== "string" || null) {
      throw new Error(`ID type is not a string or null.`);
    }

    try {
      const deletedWard = await prisma.ward.delete({ where: { id } });

      return deletedWard;
    } catch (error: any) {
      throw new Error(`Failed to delete ward: ${error.message}`);
    }
  },
};
