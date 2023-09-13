import { CreateDto } from 'src/users/dto/create.dto';

export const dataGenerator = () => {
  const data: CreateDto[] = [];

  for (let i = 1; i <= 45; i++) {
    let num: number = 0;
    const funI = () => {
      if (i % 15 > 3) num = 3;
      if (i == 3) num = 2;
      if (i < 3) num = 1;
    };
    funI();
    const item: CreateDto = {
      name: `Person ${i}`,
      email: `person${i}@example.com`,
      phone: `+38012345678${i % 5}`,
      position_id: num,
      photo: `https://example.com/photos/photo${i}.jpg`, // URL для фото
    };
    data.push(item);
  }
  return data;
};
