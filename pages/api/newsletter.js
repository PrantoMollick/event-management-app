import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    try {
      const result = await prisma.newsletter.create({
        data: {
          email: userEmail
        }
      })
    } catch (error) {
      console.log(error);
      res.status(403).json({ error: "Error occured while creating news letter"})
    }


    console.log(userEmail);
    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
