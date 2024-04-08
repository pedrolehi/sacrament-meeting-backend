import { FastifyRequest, FastifyReply } from "fastify";
import { wardService } from "../services/WardService";
import { WardSchema, WardType } from "../schemas/WardSchema";

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
};
