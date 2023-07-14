import multiparty from "multiparty";
import path from "path";
import fs from "fs/promises";
import { format } from "date-fns";
import { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req: NextApiRequest,
  saveLocally: boolean
): Promise<{ fields: any; files: any }> => {
  const form = new multiparty.Form();

  return new Promise((resolve, reject) => {
    form.parse(req, (err: Error, fields: any, files: any) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const moveFile = async (filePath: string, destinationPath: string) => {
  try {
    await fs.copyFile(filePath, destinationPath);
    console.log("File moved successfully");
  } catch (error) {
    console.error("Error moving file:", error);
  }
};
const getUniqueFilename = async (
  uploadDir: string,
  filename: string,
  index: number
): Promise<string> => {
  const baseName = path.parse(filename).name;
  const extension = path.parse(filename).ext;
  const newFilename = index > 0 ? `${baseName}_${index}${extension}` : filename;
  const newFilePath = path.join(uploadDir, newFilename);

  try {
    await fs.access(newFilePath);
    return getUniqueFilename(uploadDir, filename, index + 1);
  } catch (error) {
    return newFilename;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const img_links: string[] = [];
    const currentDate = new Date();
    const year = format(currentDate, "yyyy");
    const month = format(currentDate, "MM");
    const day = format(currentDate, "dd");
    const uploadDir = path.join(
      process.cwd(),
      `/public/uploads/thumbnail/${year}/${month}/${day}`
    );

    await fs.mkdir(uploadDir, { recursive: true });

    const { fields, files } = await readFile(req, true);

    const fileArray = Object.values(files) as Array<any>; // تعيين نوع fileArray إلى Array<any>

    for (const fileGroup of fileArray) {
      for (const file of fileGroup) {
        const temporaryPath = file.path;
        const filename = file.originalFilename;
        const uniqueFilename = await getUniqueFilename(uploadDir, filename, 0);
        const destinationPath = path.join(uploadDir, uniqueFilename);

        await moveFile(temporaryPath, destinationPath);
        img_links.push(`/uploads/thumbnail/${year}/${month}/${day}/${uniqueFilename}`);
      }
    }

    res.json({ img_links });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default handler;

