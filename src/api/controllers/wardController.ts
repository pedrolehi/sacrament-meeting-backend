import {
  WardIdType,
  WardSchema,
  WardType,
  WardUpdateType,
} from "./../schemas/WardSchema";
import { FastifyRequest, FastifyReply } from "fastify";
import { wardService } from "../services/WardService";
import { QueryType } from "../schemas/QuerySchema";
import { prisma } from "../../lib/prisma";

export const wardController = {
  //POST /wards
  createWard: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const wardData = request.body as WardType;

      // Validates if wardData is !== than type WardType and if it is, thows an error.
      const validatedData = WardSchema.safeParse(wardData);
      if (!validatedData.success) {
        throw new Error(
          `wardData does not match WardType: ${validatedData.error.message}`
        );
      }

      const newWard = await wardService.createWard(wardData);

      return reply.status(201).send({ wardId: newWard.id });
    } catch (error: any) {
      reply.code(500).send({ error: error.message });
    }
  },

  // GET /wards
  getWards: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { pageIndex } = request.query as QueryType;

      const allWards = await wardService.getWards({ pageIndex });

      return reply.send({ allWards });
    } catch (error: any) {
      throw new Error(`Error to get data: ${error.message}`);
    }
  },

  //GET /wards/:id
  getWardById: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { wardId } = request.params as WardIdType;

      const ward = await wardService.getWardById({ wardId });

      return reply.send({ ward });
    } catch (error: any) {
      throw new Error(`Error to get data: ${error.message}`);
    }
  },

  //PUT /wards/:id
  updateWard: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { wardId } = request.params as WardIdType;
      const { name, stake } = request.body as WardUpdateType;

      const updatedFields: WardUpdateType = {};

      if (name !== undefined) {
        updatedFields.name = name;
      }
      if (stake !== undefined) {
        updatedFields.stake = stake;
      }

      const newWard = await wardService.updateWard({ wardId }, updatedFields);

      return reply.send({ newWard });
    } catch (error: any) {
      throw new Error(`Error to update data: ${error.message}`);
    }
  },
};
