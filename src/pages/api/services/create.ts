import { prisma } from "@/database/prisma";
import { Service } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Service | null>
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) res.status(403).end();

  if (req.method !== "POST") return res.status(405).send(null);

  const { serviceType, title, description, value } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: `${session?.user?.email}`,
      },
      select: {
        id: true,
      },
    });

    const newService = await prisma.service.create({
      data: {
        description: `${description}`,
        title: `${title}`,
        serviceClass: "A",
        value: parseInt(value),
        serviceTypeId: parseInt(serviceType),
        providerId: `${user?.id}`,
        validFrom: new Date(), //TODO: fix dates
        validTo: new Date(),
      },
    });

    res.status(201).send(newService);
  } catch (error) {
    console.log({ error });
    res.status(500).send(null);
  }
}
