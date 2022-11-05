import * as multer from 'multer';
import * as path from 'path';
import * as crypto from 'crypto'
import * as multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';

const s3Config = new S3Client({
  region: process.env.AWS_DEFAULT_REGION,
  credentials:{
     accessKeyId: process.env.AWS_ACCESS_KEY,
     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
})

const storageTypes = {
  local: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp", "uploads"));
    },
    filename: (req, file: any, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, null);

        file.key = `${hash.toString('hex')}-${file.originalname}`

        cb(null, file.key);
      })
    }
  }),
  remote: multerS3({
    s3: s3Config,
    bucket: 'takeorders1',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) cb(err, null);

        const fileName = `${hash.toString('hex')}-${file.originalname}`

        cb(null, fileName);
      })
    }
  })
}

export const multerConfig = {
  dest: path.resolve(__dirname, "..", "..", "tmp", "uploads"),
  storage: storageTypes[process.env.ENVIRONMENT],
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const alowedMimes = [
      "image/jpeg",
      "image/jpg",
      "image/png"
    ];

    if (alowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"))
    }
  }
}