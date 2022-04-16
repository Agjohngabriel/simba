import { NextApiRequest, NextApiResponse } from "next";

import { hashPassword } from "@helpers/auth";
import prisma from "@helpers/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return;
  }

  const data = req.body;
  const { email, password, name, username } = data;
  const userEmail = email.toLowerCase();
  const fullName: string = name;
  const nName: string = username;

  if (!userEmail || !userEmail.includes("@") || !userEmail.includes(".")) {
    res.status(422).json({ message: "Invalid email" });
    return;
  }

  if (!password || password.trim().length < 7) {
    res.status(422).json({ message: "Invalid input - password should be at least 7 characters long." });
    return;
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  const existingUsername = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });
  if (existingUsername) {
    return res.status(409).json({ message: "Username is already registered" });
  }
  if (existingUser) {
    return res.status(409).json({ message: "Email address is already registered" });
  }

  const hashedPassword = await hashPassword(password);

  await prisma.user.create({
    data: {
      name: fullName,
      username: nName,
      email: userEmail,
      password: hashedPassword,
    },
  });

  res.status(201).json({ message: "Created user" });
}
