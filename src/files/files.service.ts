import { Injectable } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

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
    if (!file.mimetype.includes('image')) {
      // Здесь можно добавить обработку для других типов файлов (PDF и т.д.)
    }

    const originalName = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    );
    const nameWithoutExt = originalName.split('.').slice(0, -1).join('.');
    const uniqueFileName = `${uuidv4()}-${nameWithoutExt}.webp`;

    const buffer = await sharp(file.buffer)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 70 })
      .toBuffer();

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: uniqueFileName,
        Body: buffer,
        ContentType: 'image/webp',
        ACL: 'public-read',
      }),
    );

    return `${process.env.S3_ENDPOINT}/${this.bucketName}/${uniqueFileName}`;
  }

  async uploadCBCTFile(file: Express.Multer.File): Promise<string> {
    const originalName = Buffer.from(file.originalname, 'latin1').toString(
      'utf8',
    );
    const extension = originalName.split('.').pop() || 'dcm';
    const nameWithoutExt = originalName.split('.').slice(0, -1).join('.');
    const uniqueFileName = `cbct/${uuidv4()}-${nameWithoutExt}.${extension}`;

    // Загружаем файл как есть, без обработки
    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: uniqueFileName,
        Body: file.buffer,
        ContentType: file.mimetype || 'application/dicom',
        ACL: 'public-read',
      }),
    );

    return `${process.env.S3_ENDPOINT}/${this.bucketName}/${uniqueFileName}`;
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
