import { prisma } from "@/database/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse //<User | null>
) {
  const { phoneNumber } = req.body;
  const method = req.method;

  console.log({ phoneNumber });
  if (method === "PATCH") {
    try {
      const result = await prisma.user.update({
        where: {
          phone: phoneNumber,
        },
        data: {
          phoneConfirmed: true,
        },
      });
      console.log({ result });
      return res.status(201).json({ message: "Phone confirmed" });
    } catch (error) {
      console.log({ error });
      return res
        .status(500)
        .json({ message: "Something wrong updating user phone confirmation" });
    }
  }
  res.status(400).json({ message: `method ${method} incorrect!` });
}
