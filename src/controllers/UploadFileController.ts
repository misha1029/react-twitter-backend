import express from 'express';
import cloudinary from '../core/cloudinary';

class UploadFileController {
  async upload(req: express.Request, res: express.Response): Promise<void> {
    const file = req.file;

    cloudinary.v2.uploader
      .upload_stream({ resource_type: 'auto' }, (error, result) => {
        console.log(error, result);
        if (error || !result) {
          return res.status(500).json({
            status: 'error',
            message: error || 'upload error',
          });
        }

        res.status(201).json(result);
      })
      //@ts-ignore
      .end(file.buffer);
  }
}

export const UploadFileCtrl = new UploadFileController();
