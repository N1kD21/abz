import { Injectable } from '@nestjs/common';
import tinify from '/home/n1k/source/abz/node_modules/tinify';

@Injectable()
export class PicturesService {
  constructor() {}

  cropping_img() {
    tinify.key = 'MXs4WzdGcyNfByK13gyXt50LsTZ3ySL0';
    const source = tinify.fromUrl('https://tinypng.com/images/panda-happy.png');
    const resized = source.resize({
      method: 'cover',
      width: 70,
      height: 70,
    });
    resized.toFile('./src/pictures/picture_buffer.jpg');

    resized.store({
      service: 's3',
      aws_access_key_id: process.env.AWS_ACCESS_KEY_ID,
      aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
      region: 'eu-north-1',
      path: 'abz.image/abz_image/panda-happy.jpg',
    });
  }
}
