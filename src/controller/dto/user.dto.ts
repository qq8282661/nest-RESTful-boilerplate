import { ProfileDto } from './profile.dto';
import { CatDto } from './cat.dto';
export class UserDto {
  id: number;

  name: string;

  profile: ProfileDto;

  cat: CatDto;
}
