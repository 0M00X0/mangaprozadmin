import prisma from "db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  info?: any;
};



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const {
    userID,
    seriesname,
    seriesslug,
    seriesdescription,
    seriesalternativenames,
    seriesauthor,
    seriesartist,
    seriesyear,
    seriesserialization,
    seriesscore,
    seriestype,
    seriesstatus,
    seriesgenres,
    seriesthumbnail,
    seriescover,
  } = req.body.data;
  

  try {
    await prisma.series.create({
      data: {
        seriesname,
        seriesslug,
        seriesdescription,
        seriesalternativenames: seriesalternativenames,
        seriesauthor,
        seriesartist,
        seriesyear,
        seriesserialization,
        seriesscore,
        seriestype,
        seriesstatus,
        seriesgenres,
        seriesthumbnail,
        seriescover,
        User: { connect: { 
          id: userID,
        } },
      },
    });
    

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}