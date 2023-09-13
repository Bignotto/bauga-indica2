import { prisma } from "@/database/prisma";
import { clerkClient } from "@clerk/nextjs";
import { getAuth } from "@clerk/nextjs/server";
import { NextApiRequest, NextApiResponse } from "next";

export type DashboardProps = {
  servicesCount: number;
  messagesCount: number;
  visualizationsCount: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DashboardProps | null>
) {
  const { userId } = getAuth(req);
  if (!userId) {
    return res.status(401).end();
  }
  const clerkUser = userId ? await clerkClient.users.getUser(userId) : null;

  const user = await prisma.user.findUnique({
    where: {
      email: `${clerkUser?.emailAddresses[0].emailAddress}`,
    },
    include: {
      services: true,
    },
  });

  if (!user) res.status(404).end();

  const clicks = await prisma.log.findMany({
    where: {
      userProvider: user?.id,
    },
  });

  const messages = await prisma.contract.count({
    where: { userProviderId: user!.id },
  });

  const dashboardProps: DashboardProps = {
    servicesCount: user!.services.length,
    messagesCount: messages,
    visualizationsCount: clicks.length,
  };

  res.status(200).send(dashboardProps);
}
