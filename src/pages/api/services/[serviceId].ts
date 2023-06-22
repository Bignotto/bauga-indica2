import { prisma } from "@/database/prisma";
import { Service } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Service | null>
) {
  const { serviceId } = req.query;
  const serviceIdString = serviceId?.toString();

  const serviceFound = await prisma.service.findUnique({
    where: {
      id: serviceIdString,
    },
  });

  if (!serviceFound) return res.status(404).send(null);
  return res.status(200).send(serviceFound);
}
