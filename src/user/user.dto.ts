import { ProfileDto } from '../profile/profile.dto';
import { CatDto } from '../cat/cat.dto';
export class UserDto {
  id: number;

  name: string;

  profile: ProfileDto;

  cat: CatDto;
}
