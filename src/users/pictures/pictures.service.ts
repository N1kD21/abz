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
      aws_access_key_id: 'AKIAVKK4Y3SMC3A3ALJ3',
      aws_secret_access_key: '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',
      region: 'eu-north-1',
      path: 'abz.image/abz_image/panda-happy.jpg',
    });
  }
}
