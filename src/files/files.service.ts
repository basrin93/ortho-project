import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FilesService {
  private s3Client: S3Client;
  private bucketName = process.env.S3_BUCKET_NAME;

  constructor() {
    this.s3Client = new S3Client({
      region: process.env.S3_REGION || 'ru-1',
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
      },
      forcePathStyle: true,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const originalName = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    );
    const uniqueFileName = `${uuidv4()}-${originalName}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: uniqueFileName,
        Body: file.buffer,
        ContentType: file.mimetype,
        ACL: 'public-read',
      }),
    );

    return uniqueFileName;
  }

  async deleteFile(key: string) {
    await this.s3Client.send(
      new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      }),
    );
  }
}
