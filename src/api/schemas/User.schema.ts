import { Prisma, User } from "@prisma/client";
import { prisma } from "./../../lib/prisma";
import { z } from "zod";
import bcrypt from "bcrypt";

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  role: z.string().optional(),
  password: z.string(),
  wardId: z.string().uuid(),
});

export type UserType = z.infer<typeof UserSchema>;
