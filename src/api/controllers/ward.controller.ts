import { WardSchema, WardType } from "../schemas/Ward.schema";
import { FastifyRequest, FastifyReply } from "fastify";
import { wardService } from "../services/wardService";
import { QueryType } from "../schemas/Query.schema";

export const wardController = {
  //POST /wards
  createWard: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { name, stake } = request.body as Pick<WardType, "name" | "stake">;

      // Validates if wardData is !== than type WardType and if it is, thows an error.
      const validatedData = WardSchema.pick({
        name: true,
        stake: true,
      }).safeParse({ name, stake });
      if (!validatedData.success) {
        throw new Error(
          `wardData does not match WardType: ${validatedData.error.message}`
        );
      }

      const newWard = await wardService.createWard({ name, stake });

      return reply.status(201).send({ id: newWard.id });
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
      const { id } = request.params as Pick<WardType, "id">;

      const ward = await wardService.getWardById({ id });

      return reply.send({ ward });
    } catch (error: any) {
      throw new Error(`Error to get data: ${error.message}`);
    }
  },

  //PUT /wards/:id
  updateWard: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as Pick<WardType, "id">;
      const { name, stake } = request.body as Partial<WardType>;

      const updatedFields: Pick<WardType, "id"> & Partial<WardType> = {
        id,
        name,
        stake,
      };

      const updateResponse = await wardService.updateWard(updatedFields);

      return reply.send({ updateResponse });
    } catch (error: any) {
      throw new Error(`Error to update data: ${error.message}`);
    }
  },

  //GET /wards/:id
  deleteWard: async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { id } = request.params as Pick<WardType, "id">;

      const deletedWard = await wardService.deleteWard({ id });

      return reply.send({ deletedWard });
    } catch (error: any) {
      throw new Error(`Error to delete ward: ${error.message}`);
    }
  },
};
