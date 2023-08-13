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
        serviceProvided: true,
        contractStatus: "closed",
      },
      include: {
        userProvider: true,
        userContractor: true,
        messages: true,
        service: true,
      },
    });

    return res.status(200).send(contract);
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .json({ message: "Something wrong updating your contract." });
  }
}
