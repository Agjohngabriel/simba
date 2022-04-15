import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "@helpers/prisma";

export default async function store(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session) {
    if (req.method !== "POST") {
      return;
    }

    const data = req.body;
    const { title, url, description, length, userId } = data;

    // const checkExisting = await prisma?.eventType.findUnique({
    //     where:{
    //         title: eventTypeTitle;
    //     }
    // })

    await prisma.eventType.create({
      data: {
        title,
        url,
        description,
        length,
        active: true,
        userId,
      },
    });

    res.status(201).json({ message: "Event Type created Successfully" });
  } else {
    res.send({
      error: "You must be signed in to view the protected content on this page.",
    });
  }
}
