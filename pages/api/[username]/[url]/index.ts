import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

export default async function all(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return;
  }

  const username: string = req.query.username as string;
  const url: string = req.query.url as string;

  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
  });

  const id = user?.id;

  const data = await prisma.eventType.findFirst({
    where: {
      userId: id,
      url: url,
    },
  });
  const result = JSON.stringify(data);

  console.log(result);
  res.json(result);
}
