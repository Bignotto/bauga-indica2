import { prisma } from "@/database/prisma";
import { Contract } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Contract[] | null>
) {
  if (req.method !== "GET") return res.status(405).send(null);
  const { contractorId } = req.query;

  try {
    const contracts = await prisma.contract.findMany({
      where: {
        userContractorId: `${contractorId}`,
      },
      include: {
        service: true,
        userProvider: true,
        messages: true,
        reviews: true,
      },
      orderBy: {
        executionDate: "desc",
      },
    });

    if (!contracts) return res.status(404).send(null);
    return res.status(200).send(contracts);
  } catch (error) {
    return res.status(500).send(null);
  }
}
