import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UploadService } from './upload.service';
import { LegoUploadDto } from './dto/lego-upload.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { UserAvatarUploadDto } from './dto/avatar-upload.dto';

@Controller('uploads')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('lego-image')
  async getLegoImageUploadUrl(@Body() body: LegoUploadDto) {
    const { legoId, fileName, fileType } = body;
    return this.uploadService.getLegoImageUploadUrl(legoId, fileName, fileType);
  }

  @Post('user-avatar')
  async getUserAvatarUploadUrl(@Body() body: UserAvatarUploadDto) {
    return this.uploadService.getUserAvatarUploadUrl(
      body.fileName,
      body.fileType,
    );
  }
}
