import { ZodTypeProvider } from "fastify-type-provider-zod";
import { wardController } from "../controllers/wardController";
import { FastifyInstance } from "fastify";
import { WardSchema } from "../schemas/WardSchema";
import { z } from "zod";
import { QuerySchema } from "../schemas/QuerySchema";

// POST /wards;
export async function createWard(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/wards",
    {
      schema: {
        summary: "Creates a ward on db",
        tags: ["wards"],
        body: WardSchema,
        response: {},
      },
    },
    async (request, reply) => {
      await wardController.createWard(request, reply);
    }
  );
}

// GET /wards;
export async function getWards(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/wards",
    {
      schema: {
        summary: "Gets all wards on db",
        tags: ["wards"],
        querystring: QuerySchema,
        response: {},
      },
    },
    async (request, reply) => {
      await wardController.getWards(request, reply);
    }
  );
}
