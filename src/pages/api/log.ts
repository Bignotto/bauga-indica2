import { prisma } from "@/database/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).send(null);

  const { event, subject, data, userId, userProvider } = req.body;

  const who = userId.length === 0 ? "guest" : userId;

  const result = await prisma.log.create({
    data: {
      event,
      subject,
      data,
      userId: who,
      userProvider,
      eventDate: new Date(),
    },
  });

  if (!result) return res.status(500).end();

  return res.status(200).end();
}
