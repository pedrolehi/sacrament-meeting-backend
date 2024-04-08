import { ZodTypeProvider } from "fastify-type-provider-zod";
import { WardSchema } from "../schemas/WardSchema";
import { wardController } from "../controllers/wardController";
import { FastifyInstance } from "fastify";

// POST / wards;
export async function createWard(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/wards",
    {
      schema: {
        summary: "Creates a ward on db.",
        tags: ["wards"],
        response: {},
      },
    },
    async (request, reply) => {
      await wardController.createWard(request, reply);
    }
  );
}
