import { Body, Controller, Post } from '@nestjs/common';
import { UploadService } from './upload.service';
import { LegoUploadDto } from './dto/lego-upload.dto';

@Controller('uploads')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post('lego-image')
  async getLegoImageUploadUrl(@Body() body: LegoUploadDto) {
    const { legoId, fileName, fileType } = body;
    return this.uploadService.getLegoImageUploadUrl(legoId, fileName, fileType);
  }
}
