import { ZodTypeProvider } from "fastify-type-provider-zod";
import { wardController } from "../controllers/wardController";
import { FastifyInstance } from "fastify";
import { WardSchema } from "../schemas/Ward.schema";
import { nan, z } from "zod";
import { QuerySchema } from "../schemas/Query.schema";

// POST /wards;
export async function createWard(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    "/wards",
    {
      schema: {
        summary: "Creates a ward on db",
        tags: ["wards"],
        body: WardSchema.pick({ name: true, stake: true }),
        response: { 201: z.object({ id: z.string().uuid() }) },
      },
    },
    async (request, reply) => {
      console.log(request.body);
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
        response: { 200: z.object({ allWards: z.array(WardSchema) }) },
      },
    },
    async (request, reply) => {
      await wardController.getWards(request, reply);
    }
  );
}

// GET /wards/:id
export async function getWardById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/wards/:id",
    {
      schema: {
        summary: "Gets a ward by its ID on db",
        tags: ["wards"],
        params: WardSchema.pick({ id: true }),
        response: { 200: z.object({ ward: WardSchema }) },
      },
    },
    async (request, reply) => {
      console.log(request.params.id);

      await wardController.getWardById(request, reply);
    }
  );
}

// PUT /wards/:id
export async function updateWard(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/wards/:id",
    {
      schema: {
        summary: "Updates a ward by its ID on db",
        tags: ["wards"],
        params: WardSchema.pick({ id: true }),
        body: WardSchema.pick({ name: true, stake: true }).partial(),
        response: {
          200: z.object({
            updateResponse: z.object({
              beforeUpdate: z.object({
                name: z.string(),
                stake: z.string(),
              }),
              updated: z.object({
                name: z.string(),
                stake: z.string(),
              }),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      console.log(request.params.id);

      await wardController.updateWard(request, reply);
    }
  );
}
