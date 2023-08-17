import { prisma } from "@/database/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse //<User | null>
) {
  if (req.method !== "PATCH") return res.status(405).send(null);

  const { contractId } = req.body;

  try {
    const contract = await prisma.contract.update({
      where: {
        id: parseInt(`${contractId}`),
      },
      data: {
        contractorAgreed: true,
      },
      include: {
        userProvider: true,
        userContractor: true,
        messages: true,
        service: true,
      },
    });

    if (contract.providerAgreed && contract.contractorAgreed) {
      const executingContract = await prisma.contract.update({
        where: {
          id: parseInt(`${contractId}`),
        },
        data: {
          contractStatus: "executing",
        },
        include: {
          userProvider: true,
          userContractor: true,
          messages: true,
          service: true,
        },
      });
      return res.status(200).send(executingContract);
    }

    return res.status(200).send(contract);
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .json({ message: "Something wrong updating your contract." });
  }
}
