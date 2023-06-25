import { prisma } from "@/database/prisma";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) {
  if (req.method !== "GET") return res.status(405).send(null);
  const { userEmail } = req.query;

  const userFound = await prisma.user.findUnique({
    where: {
      email: `${userEmail}`,
    },
  });

  if (!userFound) return res.status(404).send(null);
  return res.status(200).send(userFound);
}
