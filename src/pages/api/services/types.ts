import { prisma } from "@/database/prisma";
import { ServiceType } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ServiceType[] | null>
) {
  const types = await prisma.serviceType.findMany();

  res.status(200).send(types);
}
