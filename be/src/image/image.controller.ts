import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

@Controller('image')
export class ImageController {
    @Post('upload')
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: 'public/img',
          filename: (req, file, cb) => {
            const randomName = crypto.randomBytes(16).toString('hex');
            const extension = path.extname(file.originalname);
            const uniqueFileName = `${randomName}${extension}`;
            cb(null, uniqueFileName);
          },
        }),
      }),
    )
    async Upload(@UploadedFile() file: Express.Multer.File) {
      return {
        filename: file.filename,
      };
    }

    @Get(':filename')
    async getImage(@Param('filename') filename: string, @Res() res: Response) {
      const filePath = path.join(__dirname, '../../public/img/', filename);
  
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        res.status(404).json({ message: 'Image not found' });
      }
    }

}
