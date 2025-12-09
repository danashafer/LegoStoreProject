import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class UploadService {
  private s3: S3Client;
  private bucket: string;
  private region: string;

  constructor(private config: ConfigService) {
    this.region = this.config.getOrThrow<string>('AWS_REGION');
    this.bucket = this.config.getOrThrow<string>('AWS_S3_BUCKET_NAME');

    const accessKeyId = this.config.getOrThrow<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.config.getOrThrow<string>(
      'AWS_SECRET_ACCESS_KEY',
    );

    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async getLegoImageUploadUrl(
    legoId: string,
    fileName: string,
    fileType: string,
  ) {
    const safeName = fileName.replace(/\s+/g, '-');
    const key = `legos/${legoId}/${Date.now()}-${safeName}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(this.s3, command, {
      expiresIn: 60 * 5,
    });

    const publicUrl = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;

    return {
      uploadUrl,
      key,
      publicUrl,
    };
  }

  async getUserAvatarUploadUrl(fileName: string, fileType: string) {
    const safeName = fileName.replace(/\s+/g, '-');
    const tempId = Date.now().toString();
    const key = `users/${tempId}/avatar-${Date.now()}-${safeName}`;

    const command = new PutObjectCommand({
      Bucket: this.bucket,
      Key: key,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(this.s3, command, {
      expiresIn: 60 * 5,
    });

    const publicUrl = `https://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;

    return {
      uploadUrl,
      key,
      publicUrl,
    };
  }
}
