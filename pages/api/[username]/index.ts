import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

export default async function all(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return;
  }

  const username: string = req.query.username as string;

  const data = await prisma.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      eventType: {
        select: {
          title: true,
          url: true,
          description: true,
          length: true,
        },
      },
    },
  });

  if (data !== null) {
    const result = JSON.stringify(data);
    res.json(result);
  } else {
    res.status(404).json({ Message: "No result found" });
  }

  // console.log(result)
  // console.log(data)
  res.send;
}
