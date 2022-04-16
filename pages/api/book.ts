import { NextApiRequest, NextApiResponse } from "next";

import prisma from "@helpers/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = req.body;

  const type = data.typeId;
  const user = data.mainId;
  const name = data.name;
  const email = data.email;
  const date = data.date;
  const time = data.time;
  const note = data.note;

  await prisma.event.create({
    data: {
      eventTypeId: type,
      userId: user,
      date: date,
      time: time,
      note: note,
      attendees: {
        create: [
          {
            name: name,
            email: email,
          },
        ],
      },
    },
  });
  res.json("cool");
}
