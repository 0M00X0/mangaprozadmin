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
        // Get the id from the query string
        const { id } = req.query;
        const series = await prisma.series.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json({ success: true, data: series });
    } catch (error) {
        res.status(200).json({ success: false });
    }
}