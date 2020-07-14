import { ProfileDto } from '../profile/profile.dto';
import { CatDto } from '../cat/cat.dto';
import { IsArray } from 'class-validator';
export class UserDto {
  id: string;

  name: string;

  profile: ProfileDto;
  @IsArray()
  cats: CatDto[];

  profileId: string;
}
