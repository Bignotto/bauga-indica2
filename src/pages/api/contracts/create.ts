import { prisma } from "@/database/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ contractId: number } | null>
) {
  if (req.method !== "POST") return res.status(405).send(null);
  const { serviceId, userProviderId, userContractorId, value, message } =
    req.body;

  try {
    const contract = await prisma.contract.create({
      data: {
        serviceId,
        userProviderId,
        userContractorId,
        value,
      },
    });

    const newMessage = await prisma.message.create({
      data: {
        contractId: contract.id,
        userFromId: userContractorId,
        messageDate: new Date(),
        text: message,
        messageRead: false,
      },
    });

    res.status(200).send({ contractId: contract.id });
  } catch (error) {
    console.log({ error });
    res.status(500).send(null);
  }
}
