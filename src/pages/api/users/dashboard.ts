import { prisma } from "@/database/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export type DashboardProps = {
  servicesCount: number;
  messagesCount: number;
  visualizationsCount: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardProps | null>
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) res.status(403).end();

  const user = prisma.user.findUnique({
    where: {
      email: `${session?.user?.email}`,
    },
    include: {
      services: true,
    },
  });

  if (!user) res.status(404).end();

  const dashboardProps: DashboardProps = {
    servicesCount: user.services.length,
    messagesCount: 0,
    visualizationsCount: 0,
  };

  res.status(200).send(dashboardProps);
}
