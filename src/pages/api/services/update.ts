import { prisma } from "@/database/prisma";
import { Service } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

type ErrorInterface = {
  message: string;
  status: "error" | "success";
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Service | ErrorInterface | null>
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) res.status(403).end();

  if (req.method !== "POST") return res.status(405).send(null);

  const { serviceId, serviceType, title, description, value } = req.body;

  try {
    const result = await prisma.service.update({
      where: {
        id: serviceId,
      },
      data: {
        serviceTypeId: serviceType,
        title,
        description,
        value,
      },
    });
    res.status(201).send(result);
  } catch (error) {
    console.log({ error });
    return res
      .status(500)
      .json({ message: "Something wrong updating service", status: "error" });
  }
}
