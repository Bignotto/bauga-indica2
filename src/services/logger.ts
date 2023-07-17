import { prisma } from "@/database/prisma";

type LoggerProps = {
  event: string;
  subject: string;
  data?: string;
  userId: string;
  userProvider?: string;
};

async function AppLogger({
  event,
  subject,
  data = "",
  userId,
  userProvider = "",
}: LoggerProps) {
  try {
    const result = await prisma.log.create({
      data: {
        event,
        subject,
        data,
        userId,
        userProvider,
        eventDate: new Date(),
      },
    });
    console.log({ result });
  } catch (error) {
    console.log({ error });
  }
}

export { AppLogger };
