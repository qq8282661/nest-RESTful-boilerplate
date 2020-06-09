import { IsInt, IsString } from 'class-validator';
import { UserDto } from '../user/user.dto';

export class CatDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;

  readonly id: string;

  user: UserDto;
}
