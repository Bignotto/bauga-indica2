import { prisma } from "@/database/prisma";
import { Contract } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Contract[] | null>
) {
  if (req.method !== "GET") return res.status(405).send(null);
  const { providerId } = req.query;

  try {
    const contracts = await prisma.contract.findMany({
      where: {
        userProviderId: `${providerId}`,
      },
      include: {
        service: true,
        userContractor: true,
      },
    });

    if (!contracts) return res.status(404).send(null);
    return res.status(200).send(contracts);
  } catch (error) {
    return res.status(500).send(null);
  }
}
