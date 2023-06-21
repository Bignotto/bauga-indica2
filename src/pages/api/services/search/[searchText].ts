import { prisma } from "@/database/prisma";
import { Service } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Service[] | null>
) {
  const { searchText } = req.query;

  const services = await prisma.service.findMany({
    where: {
      OR: [
        {
          title: {
            contains: `${searchText}`,
            mode: "insensitive",
          },
        },
        {
          description: { contains: `${searchText}`, mode: "insensitive" },
        },
      ],
    },
    include: {
      provider: true,
      serviceType: true,
    },
  });

  if (!services) return res.status(404).send(null);

  return res.status(200).send(services);
}

//NEXT: Implement search logger
/*
Implement a function to save data about the search being made
- what is being searched
- who is searching
- when 

Structure a model to save this data
*/
