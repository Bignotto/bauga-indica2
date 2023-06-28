import type { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE } = process.env;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

async function verifyCode(req: NextApiRequest, res: NextApiResponse) {
  const { code, phone } = req.body;

  try {
    const verificationCheck = await client.verify.v2
      .services(TWILIO_SERVICE!)
      .verificationChecks.create({ code, to: phone });

    if (verificationCheck.status === "approved") {
      // The verification code is valid
      res.status(200).json({ message: "Verification successful" });
    } else {
      // The verification code is invalid
      res.status(400).json({ message: "Invalid verification code" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying code" });
  }
}

export default verifyCode;
