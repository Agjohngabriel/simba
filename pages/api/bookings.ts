import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "@helpers/prisma";

export default async function all(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session) {
    if (req.method !== "GET") {
      return;
    }
    const id: string = session.id as string;
    const data = await prisma.event.findMany({
      where: {
        userId: id,
      },
      select: {
        date: true,
        time: true,
        note: true,
        user: {
          select: {
            name: true,
          },
        },
        attendees: {
          select: {
            name: true,
            email: true,
          },
        },
        eventType: {
          select: {
            title: true,
            length: true,
          },
        },
      },
    });
    console.log(data);
    res.json(data);
  } else {
    res.send({
      error: "You must be signed in to view the protected content on this page.",
    });
  }
}
