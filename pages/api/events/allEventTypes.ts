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
    const data = await prisma.eventType.findMany({
      where: {
        userId: id,
      },
    });

    res.json(data);
  } else {
    res.send({
      error: "You must be signed in to view the protected content on this page.",
    });
  }
}
