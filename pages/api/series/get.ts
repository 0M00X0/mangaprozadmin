import prisma from "db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  success: boolean;
  data?: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { page = 1, limit = 10, sortBy = "id", orderDirection = "asc" } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const series = await prisma.series.findMany({
      skip,
      take,
      orderBy: {
        [sortBy]: orderDirection,
      },
    });

    const totalCount = await prisma.series.count();

    const totalPages = Math.ceil(totalCount / take);

    res.status(200).json({ success: true, data: series, totalPages });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
}
