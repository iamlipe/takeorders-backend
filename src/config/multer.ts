import { resolve } from 'path';
import { randomBytes } from 'crypto'
import { diskStorage, FileFilterCallback, Options } from 'multer';



export const multerConfig: Options = {
  dest: resolve(__dirname, "..", "..", "public"),
  storage: diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, resolve(__dirname, "..", "..", "public"));
    },
    filename: (_req, file, callback) => {
      randomBytes(16, (err, hash) => {
        if (err) callback(err, null);

        const fileName = `${hash.toString("hex")}-${file.originalname}`

        callback(null, fileName);
      })

    }
  }),
  fileFilter: (_req, file: Express.Multer.File, callback: FileFilterCallback) => {
    const allowMimes = ["image/jpg", "image/jpeg", "image/png"];

    if (allowMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error("Invalid file type"));
    }

  }
}