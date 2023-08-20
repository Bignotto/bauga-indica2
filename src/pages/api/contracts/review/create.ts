import { prisma } from "@/database/prisma";
import { Review } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Review | null>
) {
  if (req.method !== "POST") return res.status(405).send(null);
  const { contractId, title, text, score } = req.body;

  try {
    const review = await prisma.review.create({
      data: {
        contractId,
        title,
        text,
        score,
        reviewDate: new Date(),
      },
    });
    res.status(200).send(review);
  } catch (error) {
    console.log({ error });
    res.status(500).send(null);
  }
}
