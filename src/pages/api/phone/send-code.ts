import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

export default async function sendCode(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { phone } = req.body;

  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const verification = await client.verify.v2
      .services(process.env.TWILIO_SERVICE!)
      .verifications.create({ to: phone, channel: "sms" });

    res.status(200).json({ success: true, message: "Verification code sent" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to send verification code" });
  }
}
