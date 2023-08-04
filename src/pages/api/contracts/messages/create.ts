import { prisma } from "@/database/prisma";
import { Message } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Message | null>
) {
  if (req.method !== "POST") return res.status(405).send(null);
  const { contractId, userFromId, text } = req.body;

  try {
    const message = await prisma.message.create({
      data: {
        contractId: parseInt(`${contractId}`),
        userFromId,
        messageDate: new Date(),
        text,
        messageRead: false,
      },
    });
    res.status(200).send(message);
  } catch (error) {
    console.log({ error });
    res.status(500).send(null);
  }
}
