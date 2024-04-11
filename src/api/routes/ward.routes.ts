import { ZodTypeProvider } from "fastify-type-provider-zod";
import { wardController } from "../controllers/wardController";
import { FastifyInstance } from "fastify";
import {
  WardIdSchema,
  WardSchema,
  WardUpdateSchema,
} from "../schemas/WardSchema";
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

// GET /wards/:wardId
export async function getWardById(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/wards/:wardId",
    {
      schema: {
        summary: "Gets a ward by its ID on db",
        tags: ["wards"],
        params: WardIdSchema,
        response: {},
      },
    },
    async (request, reply) => {
      console.log(request.params.wardId);

      await wardController.getWardById(request, reply);
    }
  );
}

// PUT /wards/:wardId
export async function updateWard(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/wards/:wardId",
    {
      schema: {
        summary: "Updates a ward by its ID on db",
        tags: ["wards"],
        params: WardIdSchema,
        body: WardUpdateSchema,
        response: {},
      },
    },
    async (request, reply) => {
      console.log(request.params.wardId);

      await wardController.updateWard(request, reply);
    }
  );
}
