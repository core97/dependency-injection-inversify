import { injectable, inject } from 'inversify';
import { UserProps } from '@/user/domain/user.entity';
import { UserRepository } from '@/user/domain/user.repository';
import { NotFoundUser } from '@/user/domain/errors/user-not-found.error';
import { RandomNameGenerator } from '@/shared/domain/services/random-name-generator';

@injectable()
export class UserService {
  constructor(
    @inject('UserRepository') private userRepo: UserRepository,
    @inject('RandomNameGenerator') private randomNameGenerator: RandomNameGenerator,
  ) {}

  async create(params: Pick<UserProps, 'birthDate' | 'email'>) {
    const user = await this.userRepo.create({
      ...params,
      name: this.randomNameGenerator.generate(),
    });

    return user;
  }

  async getByEmail(email: string) {
    const result = await this.userRepo.findOneByEmail(email);
    return result;
  }

  async getByEmailOrThrow(email: string) {
    const result = await this.userRepo.findOneByEmail(email);

    if (!result) {
      throw new NotFoundUser.ByEmail(email);
    }

    return result;
  }
}
