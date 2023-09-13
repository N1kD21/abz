import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
const regexp =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
export class CreateDto {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 - 60 characters.' })
  @MaxLength(60, { message: 'Name must have atleast 2 - 60 characters.' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Matches(regexp, {
    message: `Email must contain Minimum 5 characters, `,
  })
  email: string;

  @IsNotEmpty()
  @MaxLength(13, { message: 'Name must have atleast 13 characters.' })
  @IsPhoneNumber('UA', {
    message: `Phone number must start with +380 and contain 13 characters `,
  })
  phone: string;

  @IsNotEmpty()
  @IsInt()
  position_id: number;

  @IsNotEmpty()
  photo: string;
}
