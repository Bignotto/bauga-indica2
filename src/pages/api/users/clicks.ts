import { prisma } from "@/database/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) res.status(403).end();

  const user = await prisma.user.findUnique({
    where: { email: `${session?.user?.email}` },
  });

  if (!user) res.status(404).end();

  const clicks = await prisma.log.groupBy({
    by: ["subject"],
    _count: { id: true },
    where: {
      userProvider: user?.id,
    },
  });

  const services = await prisma.service.findMany({
    where: {
      id: {
        in: clicks.map((c) => c.subject),
      },
    },
    select: {
      id: true,
      title: true,
    },
  });

  const returnData = clicks.map((c) => {
    const theService = services.find((s) => s.id === c.subject);
    return {
      title: theService?.title,
      id: c.subject,
      clicks: c._count.id,
    };
  });

  res.status(200).json(returnData);
}
