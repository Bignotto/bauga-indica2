import { prisma } from "@/database/prisma";
import { Contract } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Contract | null>
) {
  if (req.method !== "GET") return res.status(405).send(null);
  const { contractId } = req.query;

  const contractFound = await prisma.contract.findUnique({
    where: {
      id: parseInt(`${contractId}`),
    },
    include: {
      userProvider: true,
      userContractor: true,
      messages: true,
      service: true,
    },
  });

  if (!contractFound) return res.status(404).send(null);
  return res.status(200).send(contractFound);
}
