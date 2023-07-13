import { prisma } from "@/database/prisma";
import { Service } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Service[] | null>
) {
  if (req.method !== "GET") return res.status(405).send(null);
  const { userId } = req.query;

  const services = await prisma.service.findMany({
    where: {
      providerId: `${userId}`,
    },
    include: {
      provider: true,
      serviceType: true,
    },
  });

  if (!services) return res.status(404).send(null);
  return res.status(200).send(services);
}
