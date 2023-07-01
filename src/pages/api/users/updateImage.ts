import { prisma } from "@/database/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PATCH") return res.status(405).send(null);
  const { image, userId } = req.body;

  try {
    const updated = await prisma.user.update({
      data: { image },
      where: {
        id: userId,
      },
    });
    res.status(200).json({ success: true, message: "User image updated." });
  } catch (error) {
    console.log({ error });
    res.status(500).json({
      success: false,
      message: "Something wrong while updating user in database",
    });
  }
}
