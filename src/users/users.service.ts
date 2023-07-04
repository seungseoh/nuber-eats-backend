import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateAccountInput } from './dtos/create-account.dto';
import { LoginInput } from './dtos/login.dto';
import { JwtService } from 'src/jwt/jwt.service';
import { EditProfileInput } from './dtos/edit-profile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<{ ok: boolean; error?: string }> {
    try {
      const exists = await this.users.findOne({ where: { email } });
      if (exists) {
        // make error
        return { ok: false, error: 'There is a user with that email already' };
      }
      await this.users.save(this.users.create({ email, password, role }));
      return { ok: true };
    } catch (e) {
      //make error
      return { ok: false, error: "Couldn't create account" };
    }
  }

  async login({
    email,
    password,
  }: LoginInput): Promise<{ ok: boolean; error?: string; token?: string }> {
    // make a JWT and give it to the user
    try {
      const user = await this.users.findOne({ where: { email } });
      if (!user) {
        return {
          ok: false,
          error: 'User not found',
        };
      }
      const passwordCorrect = await user.checkPassword(password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: 'Wrong password',
        };
      }
      const token = this.jwtService.sign(user.id);
      return {
        ok: true,
        token: token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async findById(id: number): Promise<User> {
    return this.users.findOne({ where: { id } });
  }

  /**
   *
   * @BeforeUpdate()
   * save()메서드를 사용하여 업데이트되기 전에 실행되는 데코레이터이다.
   * @BeforeUpdate()는 모델에서 정보가 변경된 경우에만 발생한다는 점에 유의하십시오.
   * 모델에서 아무 것도 수정하지 않고 저장을 실행하면 @BeforeUpdate 및 @AfterUpdate가 실행되지 않습니다.
   * 모델에서 변경된 것이 아닌 db에 update query만 보내고 있기 때문에 @BeforeUpdate() 데코레이터가 실행되지 않은 것이다.
   * https://github.com/typeorm/typeorm/blob/master/docs/listeners-and-subscribers.md#beforeupdate
   */
  async editProfile(
    id: number,
    { email, password }: EditProfileInput,
  ): Promise<User> {
    const user = await this.users.findOne({ where: { id } });
    if (email) {
      user.email = email;
    }
    if (password) {
      user.password = password;
    }
    return this.users.save(user);
  }
}
